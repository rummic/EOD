namespace EOD.BL.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using AutoMapper;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.UserDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.BL.Validators;
    using EOD.Commons.ExtensionMethods;
    using EOD.Commons.Helpers;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IOptions<AppSettings> _appSettings;

        public UsersService(IUsersRepository usersRepository, IOptions<AppSettings> appSettings)
        {
            _usersRepository = usersRepository;
            _appSettings = appSettings;
        }

        public async Task<ResponseDto<GetUserDto>> GetUserById(int id)
        {
            var userFromDb = await _usersRepository.GetUserById(id);
            ResponseDto<GetUserDto> response = UsersValidator.ValidateGetUserById(userFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            var mappedUser = Mapper.Map<GetUserDto>(userFromDb);
            response.Value = mappedUser;
            return response;
        }

        public async Task<ResponseDto<List<GetUserDto>>> GetUsers(bool allUsers = false)
        {
            var response = new ResponseDto<List<GetUserDto>>();
            var usersFromDb = await _usersRepository.GetUsers();
            var mappedUsers = allUsers ?
                Mapper.Map<List<GetUserDto>>(usersFromDb) :
                Mapper.Map<List<GetUserDto>>(usersFromDb.Where(x => !x.IsDeleted));
            response.Value = mappedUsers;
            return response;
        }

        public async Task<ResponseDto<int>> AddUser(AddUserDto userToAdd)
        {
            var userFromDb = await _usersRepository.GetUserByLogin(userToAdd.Login);
            var response = UsersValidator.ValidateAddUser(userToAdd, userFromDb);
            if (response.HasErrors)
                return response;

            var userToDb = Mapper.Map<User>(userToAdd);
            userToDb.Salt = SaltCreator.CreateSalt();
            userToDb.Password = userToAdd.Password.GenerateSaltedHash(userToDb.Salt);
            var result = await _usersRepository.AddUser(userToDb);
            response.Value = result;

            return response;
        }

        public async Task<ResponseDto<int>> UpdateUser(ClaimsPrincipal loggedInUser, AddUserDto userToUpdate)
        {
            var userFromDb = await _usersRepository.GetUserByLogin(userToUpdate.Login);

            ResponseDto<int> response = UsersValidator.ValidateUpdateUser(loggedInUser, userToUpdate, userFromDb);
            if (response.HasErrors)
                return response;

            var mappedUser = Mapper.Map<User>(userToUpdate);
            mappedUser.Id = userFromDb.Id;
            if (mappedUser.Password.Length != 0 && !userFromDb.Password.IsEqualTo(userToUpdate.Password.GenerateSaltedHash(userFromDb.Salt)))
            {
                mappedUser.Salt = SaltCreator.CreateSalt();
                mappedUser.Password = userToUpdate.Password.GenerateSaltedHash(mappedUser.Salt);
            }

            var result = await _usersRepository.UpdateUser(mappedUser);
            response.Value = result;

            return response;
        }

        public async Task<ResponseDto<bool>> DeleteUser(ClaimsPrincipal userIdentity, int id)
        {
            var userFromDb = await _usersRepository.GetUserById(id);
            ResponseDto<bool> response = UsersValidator.ValidateDeleteUser(userIdentity, userFromDb);
            if (response.HasErrors)
            {
                return response;
            }
            var result = await _usersRepository.DeleteUser(id);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<int>> ChangePassword(ClaimsPrincipal userIdentity, ChangePasswordDto changePasswordDto)
        {
            var userFromDb = await _usersRepository.GetUserByLogin(userIdentity.Identity.Name);
            ResponseDto<int> response = UsersValidator.ValidateChangePassword(userFromDb, changePasswordDto);
            if (response.HasErrors)
            {
                return response;
            }

            userFromDb.Salt = SaltCreator.CreateSalt();
            userFromDb.Password = changePasswordDto.NewPassword.GenerateSaltedHash(userFromDb.Salt);
            var result = await _usersRepository.UpdateUser(userFromDb);
            response.Value = result;
            return response;
        }

        public async Task<ResponseDto<bool>> ChangeRole(int id, string role)
        {
            var userFromDb = await _usersRepository.GetUserById(id);
            ResponseDto<bool> response = UsersValidator.ValidateChangeRole(userFromDb, role);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _usersRepository.ChangeRole(id, role);
            return response;
        }

        public async Task<ResponseDto<bool>> ResetPassword(string mail)
        {
            var userFromDb = await _usersRepository.GetUserByMail(mail);
            var response = UsersValidator.ValidateResetPassword(userFromDb, mail);
            if (response.HasErrors)
            {
                return response;
            }

            var newPassword = CreateRandomPassword(10);
            userFromDb.Salt = SaltCreator.CreateSalt();
            userFromDb.Password = newPassword.GenerateSaltedHash(userFromDb.Salt);
            var result = await _usersRepository.UpdateUser(userFromDb);
            await MailHelper.ResetPasswordMail(_appSettings.Value, mail, newPassword);
            response.Value = true;
            return response;
        }

        public async Task<ResponseDto<LoggedInUserDto>> Authenticate(LoginUserDto loginUserDto)
        {
            var user = await _usersRepository.GetUserByLogin(loginUserDto.Login);
            ResponseDto<LoggedInUserDto> response = UsersValidator.ValidateAuthenticate(user, loginUserDto);
            if (response.HasErrors)
            {
                return response;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);

            var subject = new ClaimsIdentity(
                new[] { new Claim(ClaimTypes.Name, user.Login), new Claim(ClaimTypes.Role, user.Role) });

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = signingCredentials
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            response.Value = new LoggedInUserDto()
            {
                Id = user.Id,
                Login = user.Login,
                Token = tokenHandler.WriteToken(token)
            };
            return response;
        }

        public static string CreateRandomPassword(int length)
        {
            string validChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?_-";
            Random random = new Random();
            char[] chars = new char[length];
            for (int i = 0; i < length; i++)
            {
                chars[i] = validChars[random.Next(0, validChars.Length)];
            }
            return new string(chars);
        }
    }
}
