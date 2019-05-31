namespace EOD.API.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.UserDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.Commons.Enumerables;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginUserDto userParam)
        {
            ResponseDto<LoggedInUserDto> userResult = await _usersService.Authenticate(userParam);

            if (userResult.HasErrors)
            {
                return BadRequest(userResult);
            }

            return Ok(userResult);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDto<GetUserDto>>> GetUserById(int id)
        {
            ResponseDto<GetUserDto> userResponse = await _usersService.GetUserById(id);
            if (userResponse.HasErrors)
            {
                return BadRequest(userResponse);
            }

            return Ok(userResponse);
        }

        [HttpGet]
        [Authorize(Roles = Role.Admin + ", " + Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<List<GetUserDto>>>> GetUsers()
        {
            ResponseDto<List<GetUserDto>> usersResponse = await _usersService.GetUsers();
            if (usersResponse.HasErrors)
            {
                return BadRequest(usersResponse);
            }

            return Ok(usersResponse);
        }

        [HttpPost]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<int>>> AddUser([FromBody]AddUserDto userToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _usersService.AddUser(userToAdd);

            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<int>> UpdateUser([FromBody]AddUserDto userToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _usersService.UpdateUser(User, userToUpdate);

            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPatch]
        public async Task<ActionResult<bool>> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _usersService.ChangePassword(User, changePasswordDto);

            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPatch("ChangeRole")]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult> ChangeRole(int id, string role)
        {
            ResponseDto<bool> result = await _usersService.ChangeRole(id, role);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.User + ", " + Role.SuperAdmin)]
        public async Task<ActionResult> DeleteUser(int id)
        {
            ResponseDto<bool> result = await _usersService.DeleteUser(User, id);
            if (result.Value)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}