namespace EOD.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EOD.DAL.Model;

    public interface ISharedDocumentsRepository
    {
        Task<SharedDocument> AddSharedDocument(SharedDocument sharedDocument);

        Task<SharedDocument> SeenSharedDocument(int id);

        Task<List<SharedDocument>> GetSharedDocuments();

        Task<SharedDocument> GetSharedDocument(int id);
    }
}
