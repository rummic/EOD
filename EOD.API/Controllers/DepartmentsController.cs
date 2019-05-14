namespace EOD.API.Controllers
{
    using EOD.BL.Dtos;
    using EOD.BL.Services.Interfaces;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    using EOD.BL.Dtos.DepartmentDtos;
    using EOD.Commons.Enumerables;

    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentsService _departmentsService;

        public DepartmentsController(IDepartmentsService departmentsService)
        {
            _departmentsService = departmentsService;
        }

        [HttpPost]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<int>>> AddDepartment([FromBody] AddDepartmentDto departmentDto)
        {
            ResponseDto<int> result = await _departmentsService.AddDepartment(departmentDto);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
