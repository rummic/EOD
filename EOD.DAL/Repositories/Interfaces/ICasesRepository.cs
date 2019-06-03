namespace EOD.DAL.Repositories.Interfaces
{
    using EOD.DAL.Model;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICasesRepository
    {
        Task<Case> GetCaseById(int id, bool withTracking = true);
        Task<IEnumerable<Case>> GetCases();
        Task<IEnumerable<Case>> GetCasesForManager(User userFromDb);
        Task<int> AddCase(Case caseToDb);
        Task<int> ChangeStatus(Case CaseFromDb, string status);
        Task<bool> DeleteCase(Case caseFromDb);
        Task<IEnumerable<Case>> GetUsersCases(User userFromDb);
    }
}