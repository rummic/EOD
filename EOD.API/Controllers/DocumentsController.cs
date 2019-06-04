﻿namespace EOD.API.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.Commons.Enumerables;
    using EOD.DAL.Model;

    using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<ResponseDto<string>>> UploadDocument(IFormFile document, int caseId)
        {
            ResponseDto<string> result = await _documentsService.AddDocument(User, document, caseId);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut("SendMail")]
        public async Task<ActionResult<ResponseDto<bool>>> SendMail([FromBody] SendDocumentMailDto mailDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            ResponseDto<bool> result = await _documentsService.SendMail(mailDto);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("SharedDocument")]
        public async Task<ActionResult<ResponseDto<int>>> AddSharedDocument([FromBody] AddSharedDocumentDto documentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _documentsService.AddSharedDocument(documentDto);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPatch("DocumentSeen")]
        public async Task<ActionResult<ResponseDto<string>>> DocumentSeen(int id)
        {
            ResponseDto<string> result = await _documentsService.DocumentSeen(id);
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet("SharedDocuments")]
        [Authorize(Roles = Role.SuperAdmin)]
        public async Task<ActionResult<ResponseDto<List<SharedDocument>>>> GetSharedDocuments()
        {
            ResponseDto<List<SharedDocument>> result = await _documentsService.GetSharedDocuments();
            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
