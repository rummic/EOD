namespace EOD.BL.Services.Interfaces
{
    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentTypeDtos;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDocumentTypesService
    {
        Task<ResponseDto<List<GetDocumentTypeDto>>> GetDocumentTypes(int departmentId);
        Task<ResponseDto<int>> AddDocumentType(AddDocumentTypeDto documentTypeToAdd);
        Task<ResponseDto<bool>> DeleteDocumentType(int id);
    }
}