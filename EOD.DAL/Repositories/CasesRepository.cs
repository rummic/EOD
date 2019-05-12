namespace EOD.DAL.Repositories
{

    using EOD.DAL.Config;
    using EOD.DAL.Repositories.Interfaces;

    public class CasesRepository : ICasesRepository
    {
        private readonly ApplicationDbContext _context;

        public CasesRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
