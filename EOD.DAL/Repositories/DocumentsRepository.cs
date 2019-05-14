using EOD.DAL.Config;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.DAL.Repositories
{
    using EOD.DAL.Model;
    using System.Threading.Tasks;

    public class DocumentsRepository : IDocumentsRepository
    {
        private readonly ApplicationDbContext _context;

        public DocumentsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddDocument(Document documentToAdd)
        {
            await _context.AddAsync(documentToAdd);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
