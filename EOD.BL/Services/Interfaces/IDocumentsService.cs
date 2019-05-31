namespace EOD.BL.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.DAL.Model;

    using Microsoft.AspNetCore.Http;

    public interface IDocumentsService
    {
        Task<ResponseDto<string>> AddDocument(ClaimsPrincipal user, IFormFile document, int caseId);

        Task<ResponseDto<int>> SendMail(string recipient, string documentUrl);

        Task<ResponseDto<bool>> DocumentSeen(int id);

        Task<ResponseDto<List<SharedDocument>>> GetSharedDocuments();
    }
}