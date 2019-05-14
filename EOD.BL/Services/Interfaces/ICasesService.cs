namespace EOD.BL.Services.Interfaces
{
    using EOD.BL.Dtos;
    using EOD.BL.Dtos.CaseDtos;

    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface ICasesService
    {
        Task<ResponseDto<GetCaseDto>> GetCaseById(int id);
        Task<ResponseDto<List<GetCaseDto>>> GetCases(bool allCases = false);
        Task<ResponseDto<List<GetCaseDto>>> GetCasesForManager(ClaimsPrincipal user);
        Task<ResponseDto<int>> AddCase(ClaimsPrincipal user, AddCaseDto caseToAdd);
        Task<ResponseDto<int>> ChangeStatus(ClaimsPrincipal user, int id, string status);
        Task<ResponseDto<bool>> DeleteCase(ClaimsPrincipal user, int id);
    }
}
