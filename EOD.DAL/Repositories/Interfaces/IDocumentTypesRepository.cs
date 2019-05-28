namespace EOD.DAL.Repositories.Interfaces
{
    using EOD.DAL.Model;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDocumentTypesRepository
    {
        Task<List<DocumentType>> GetDocumentTypes(Department departmentFromDb);
        Task<int> AddDocumentType(DocumentType documentTypeToDb);
        Task<DocumentType> GetDocumentTypeById(int id);
        Task<bool> DeleteDocumentType(DocumentType documentTypeFromDb);
    }
}