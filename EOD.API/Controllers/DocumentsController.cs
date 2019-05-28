namespace EOD.API.Controllers
{
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Services.Interfaces;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentsService _documentsService;

        public DocumentsController(IDocumentsService documentsService)
        {
            _documentsService = documentsService;
        }

        [HttpPost("{caseId}")]
        public async Task<ActionResult<ResponseDto<string>>> UploadPhoto(IFormFile photo, int caseId)
        {
            ResponseDto<string> result = await _documentsService.AddDocument(User, photo, caseId);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
