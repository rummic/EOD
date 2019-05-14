using System.Linq;

namespace EOD.DAL.Repositories
{
    using EOD.DAL.Config;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.EntityFrameworkCore;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CasesRepository : ICasesRepository
    {
        private readonly ApplicationDbContext _context;

        public CasesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Case> GetCaseById(int id, bool withTracking = true)
        {
            var caseFromDb = await _context.Cases
                .Include(x => x.Department)
                .Include(x => x.Sender)
                .Include(x => x.Documents)
                .FirstOrDefaultAsync(x => x.Id == id);
            return caseFromDb;
        }

        public async Task<IEnumerable<Case>> GetCases()
        {
            var cases = await _context.Cases
                .Include(x => x.Department)
                .Include(x => x.Sender)
                .Include(x => x.Documents)
                .ToListAsync();
            return cases;
        }

        public async Task<IEnumerable<Case>> GetCasesForManager(User userFromDb)
        {
            var cases = await _context.Cases
                .Where(x => x.Department.Manager == userFromDb && !x.IsDeleted)
                .Include(x => x.Department)
                .Include(x => x.Sender)
                .Include(x => x.Documents)
                .ToListAsync();
            return cases;
        }

        public async Task<int> AddCase(Case caseToDb)
        {
            await _context.Cases.AddAsync(caseToDb);
            await _context.SaveChangesAsync();
            return caseToDb.Id;
        }

        public async Task<int> ChangeStatus(Case CaseFromDb, string status)
        {
            CaseFromDb.Status = status;
            await _context.SaveChangesAsync();
            return CaseFromDb.Id;
        }

        public async Task<bool> DeleteCase(Case caseFromDb)
        {
            caseFromDb.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
