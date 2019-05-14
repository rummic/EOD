namespace EOD.API.Controllers
{
    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentTypeDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.Commons.Enumerables;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("policy")]
    [Authorize]
    public class DocumentTypesController : ControllerBase
    {
        private readonly IDocumentTypesService _documentTypesService;

        public DocumentTypesController(IDocumentTypesService documentTypesService)
        {
            _documentTypesService = documentTypesService;
        }

        [HttpGet("{departmentId}")]
        public async Task<ActionResult<ResponseDto<List<GetDocumentTypeDto>>>> GetDocumentTypes(int departmentId)
        {
            ResponseDto<List<GetDocumentTypeDto>> documentTypesResponse = await _documentTypesService.GetDocumentTypes(departmentId);
            if (documentTypesResponse.HasErrors)
            {
                return BadRequest(documentTypesResponse);
            }

            return Ok(documentTypesResponse);
        }

        [HttpPost]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<int>>> AddDocumentType([FromBody] AddDocumentTypeDto documentTypeToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<int> result = await _documentTypesService.AddDocumentType(documentTypeToAdd);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<bool>>> DeleteDocumentType(int id)
        {
            ResponseDto<bool> result = await _documentTypesService.DeleteDocumentType(id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
