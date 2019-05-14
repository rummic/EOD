namespace EOD.BL.Services.Interfaces
{
    using System.Security.Claims;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;

    using Microsoft.AspNetCore.Http;

    public interface IDocumentsService
    {
        Task<ResponseDto<string>> AddDocument(ClaimsPrincipal user, IFormFile document, int caseId);
    }
}