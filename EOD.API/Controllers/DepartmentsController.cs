using System.Collections.Generic;
using EOD.DAL.Model;

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

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<List<Department>>>> GetDepartments()
        {
            ResponseDto<List<Department>> response = await _departmentsService.GetDepartments();
            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<Department>>> GetDepartmentById(int id)
        {
            ResponseDto<Department> response = await _departmentsService.GetDepartmentById(id);
            if (response.HasErrors)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<int>>> AddDepartment([FromBody] AddDepartmentDto departmentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _departmentsService.AddDepartment(departmentDto);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<int>>> ChangeName(int id, string name)
        {
            ResponseDto<int> result = await _departmentsService.ChangeName(id, name);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPatch]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult> AssignManager(int id, int userId)
        {
            ResponseDto<bool> result = await _departmentsService.AssignManager(id, userId);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult> DeleteDepartment(int id)
        {
            ResponseDto<bool> result = await _departmentsService.DeleteDepartment(id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
