namespace EOD.BL.Validators
{
    using System.Security.Claims;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.UserDtos;
    using EOD.Commons.Enumerables;
    using EOD.Commons.ErrorMessages;
    using EOD.Commons.ExtensionMethods;
    using EOD.DAL.Model;

    public static class UsersValidator
    {
        public static ResponseDto<GetUserDto> ValidateGetUserById(User user)
        {
            var response = new ResponseDto<GetUserDto>();
            if (user == null)
            {
                response.AddError(UserErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<int> ValidateAddUser(AddUserDto userToAdd, User user)
        {
            var response = new ResponseDto<int>();
            if (user != null)
                response.AddError(UserErrors.LoginTaken);
            if (string.IsNullOrEmpty(userToAdd.Login))
                response.AddError(UserErrors.EmptyLogin);
            if (string.IsNullOrEmpty(userToAdd.Email))
                response.AddError(UserErrors.EmptyEmail);
            if (string.IsNullOrEmpty(userToAdd.FirstName))
                response.AddError(UserErrors.EmptyFirstName);
            if (string.IsNullOrEmpty(userToAdd.LastName))
                response.AddError(UserErrors.EmptyLastName);

            return response;
        }

        public static ResponseDto<int> ValidateUpdateUser(ClaimsPrincipal loggedInUser, AddUserDto userToUpdate, User userFromDb)
        {
            var response = new ResponseDto<int>();
            if (userFromDb == null)
                response.AddError(UserErrors.NotFoundByLogin);
            if (!loggedInUser.IsInRole(Role.SuperAdmin))
                response.AddError(UserErrors.NotAllowed);

            return response;
        }

        public static ResponseDto<bool> ValidateDeleteUser(ClaimsPrincipal userIdentity, User userFromDb)
        {
            var response = new ResponseDto<bool>();
            if (userFromDb == null || userFromDb.IsDeleted)
            {
                response.AddError(UserErrors.NotFoundById);
                return response;
            }

            if (userIdentity.IsInRole("User") && userIdentity.Identity.Name != userFromDb.Login)
                response.AddError(UserErrors.CannotDeleteUser);

            return response;
        }

        public static ResponseDto<LoggedInUserDto> ValidateAuthenticate(User user, LoginUserDto loginUser)
        {
            var response = new ResponseDto<LoggedInUserDto>();

            if (user == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            if (!user.Password.IsEqualTo(loginUser.Password.GenerateSaltedHash(user.Salt)))
                response.AddError(UserErrors.InvalidPassword);

            return response;


        }

        public static ResponseDto<int> ValidateChangePassword(User userFromDb, ChangePasswordDto passwordDto)
        {
            var response = new ResponseDto<int>();

            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundByLogin);
                return response;
            }

            if (!userFromDb.Password.IsEqualTo(passwordDto.CurrentPassword.GenerateSaltedHash(userFromDb.Salt)))
            {
                response.AddError(UserErrors.InvalidPassword);
                return response;
            }

            if (passwordDto.NewPassword != passwordDto.ConfirmNewPassword)
                response.AddError(UserErrors.InvalidConfirmPassword);

            return response;
        }
    }
}
