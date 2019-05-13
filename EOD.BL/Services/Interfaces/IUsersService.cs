namespace EOD.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.UserDtos;

    public interface IUsersService
    {
        Task<ResponseDto<int>> AddUser(AddUserDto userToAdd);
        Task<ResponseDto<LoggedInUserDto>> Authenticate(LoginUserDto loginUserDto);
        Task<ResponseDto<GetUserDto>> GetUserById(int id);
        Task<ResponseDto<List<GetUserDto>>> GetUsers(bool allUsers = false);
        Task<ResponseDto<int>> UpdateUser(ClaimsPrincipal loggedInUser, AddUserDto userToUpdate);
        Task<ResponseDto<bool>> DeleteUser(ClaimsPrincipal userIdentity, int id);

        Task<ResponseDto<int>> ChangePassword(ClaimsPrincipal userIdentity, ChangePasswordDto changePasswordDto);
    }
}
