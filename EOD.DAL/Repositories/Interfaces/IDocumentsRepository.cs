namespace EOD.DAL.Repositories.Interfaces
{
    using System.Threading.Tasks;

    using EOD.DAL.Model;

    public interface IDocumentsRepository
    {
        Task<bool> AddDocument(Document documentToAdd);
    }
}