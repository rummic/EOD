namespace EOD.BL.Services
{
    using EOD.BL.Services.Interfaces;
    using EOD.DAL.Repositories.Interfaces;

    public class CasesService : ICasesService
    {
        private readonly ICasesRepository casesRepository;

        public CasesService(ICasesRepository casesRepository)
        {
            this.casesRepository = casesRepository;
        }
    }
}
