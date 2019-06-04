namespace EOD.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentDtos;
    using EOD.DAL.Model;

    using Microsoft.AspNetCore.Http;

    public interface IDocumentsService
    {
        Task<ResponseDto<string>> AddDocument(ClaimsPrincipal user, IFormFile document, int caseId);

        Task<ResponseDto<bool>> SendMail(SendDocumentMailDto mailDto);

        Task<ResponseDto<int>> AddSharedDocument(AddSharedDocumentDto documentDto);

        Task<ResponseDto<string>> DocumentSeen(int id);

        Task<ResponseDto<List<SharedDocument>>> GetSharedDocuments();
    }
}