namespace EOD.DAL.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using EOD.DAL.Config;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    public class UsersRepository : IUsersRepository
    {
        private readonly ApplicationDbContext _context;

        public UsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserById(int id, bool withTracking = true)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<User> GetUserByLogin(string login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => string.CompareOrdinal(x.Login, login) == 0);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<int> AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<int> UpdateUser(User user)
        {
            var userFromDb = await GetUserById(user.Id);
            userFromDb.Email = user.Email;
            userFromDb.FirstName = user.FirstName;
            userFromDb.LastName = user.LastName;
            userFromDb.Password = user.Password;
            userFromDb.Salt = user.Salt;
            await _context.SaveChangesAsync();
            return userFromDb.Id;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var userFromDb = await GetUserById(id);
            userFromDb.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ChangeRole(int id, string role)
        {
            var userFromDb = await GetUserById(id);
            userFromDb.Role = role;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User> GetUserByMail(string mail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == mail);
            return user;
        }
    }
}
