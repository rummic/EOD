namespace EOD.DAL.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EOD.DAL.Model;

    public interface IUsersRepository
    {
        Task<User> GetUserById(int id, bool withTracking = true);
        Task<User> GetUserByLogin(string login);
        Task<IEnumerable<User>> GetUsers();
        Task<int> AddUser(User user);
        Task<int> UpdateUser(User user);
        Task<bool> DeleteUser(int id);
        Task<bool> ChangeRole(int id, string role);
        Task<User> GetUserByMail(string mail);
    }
}
