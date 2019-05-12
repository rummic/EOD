using EOD.DAL.Config;
using EOD.DAL.Repositories.Interfaces;

namespace EOD.DAL.Repositories
{
    class DocumentsRepository : IDocumentsRepository
    {
        private readonly ApplicationDbContext _context;

        public DocumentsRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
