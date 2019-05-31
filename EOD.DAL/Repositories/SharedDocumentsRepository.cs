namespace EOD.DAL.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EOD.DAL.Config;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class SharedDocumentsRepository : ISharedDocumentsRepository
    {
        private readonly ApplicationDbContext _context;

        public SharedDocumentsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SharedDocument> AddSharedDocument(SharedDocument sharedDocument)
        {
            await _context.SharedDocuments.AddAsync(sharedDocument);
            await _context.SaveChangesAsync();
            return sharedDocument;
        }

        public async Task<SharedDocument> SeenSharedDocument(int id)
        {
            var sharedDocument = await _context.SharedDocuments.FirstOrDefaultAsync(x => x.Id == id);
            sharedDocument.Seen = true;
            await _context.SaveChangesAsync();
            return sharedDocument;
        }

        public async Task<List<SharedDocument>> GetSharedDocuments()
        {
            return await _context.SharedDocuments.ToListAsync();
        }
    }
}
