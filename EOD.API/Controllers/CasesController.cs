namespace EOD.API.Controllers
{
    using EOD.BL.Dtos;
    using EOD.BL.Dtos.CaseDtos;
    using EOD.BL.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class CasesController : ControllerBase
    {
        private readonly ICasesService _casesService;

        public CasesController(ICasesService casesService)
        {
            _casesService = casesService;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<GetCaseDto>>> GetCaseById(int id)
        {
            ResponseDto<GetCaseDto> caseResponse = await _casesService.GetCaseById(id);
            if (caseResponse.HasErrors)
            {
                return BadRequest(caseResponse);
            }

            return Ok(caseResponse);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<List<GetCaseDto>>>> GetCases()
        {
            ResponseDto<List<GetCaseDto>> casesResponse = await _casesService.GetCases();
            if (casesResponse.HasErrors)
            {
                return BadRequest(casesResponse);
            }

            return Ok(casesResponse);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseDto<int>>> AddCase([FromBody] AddCaseDto caseToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _casesService.AddCase(User, caseToAdd);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut]
        [AllowAnonymous]
        //[Authorize(Roles = Role.Admin + ", " + Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<int>>> ChangeStatus(int id, string status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _casesService.ChangeStatus(User, id, status);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);

        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        //[Authorize(Roles = Role.Admin + ", " + Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<bool>>> DeleteCase(int id)
        {
            ResponseDto<bool> result = await _casesService.DeleteCase(User, id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
