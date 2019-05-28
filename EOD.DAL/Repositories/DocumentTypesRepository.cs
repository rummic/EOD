namespace EOD.DAL.Repositories
{
    using EOD.DAL.Config;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.EntityFrameworkCore;

    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class DocumentTypesRepository : IDocumentTypesRepository
    {
        private readonly ApplicationDbContext _context;

        public DocumentTypesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<DocumentType>> GetDocumentTypes(Department departmentFromDb)
        {
            var documentTypes = await _context.DocumentTypes.Where(x => x.Department == departmentFromDb).ToListAsync();
            return documentTypes;
        }

        public async Task<int> AddDocumentType(DocumentType documentTypeToDb)
        {
            await _context.DocumentTypes.AddAsync(documentTypeToDb);
            await _context.SaveChangesAsync();
            return documentTypeToDb.Id;
        }

        public async Task<DocumentType> GetDocumentTypeById(int id)
        {
            var documentType = await _context.DocumentTypes.FirstOrDefaultAsync(x => x.Id == id);
            return documentType;
        }

        public async Task<bool> DeleteDocumentType(DocumentType documentTypeFromDb)
        {
            _context.DocumentTypes.Remove(documentTypeFromDb);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
