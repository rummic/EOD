using System.Collections.Generic;
using System.Linq;

namespace EOD.DAL.Repositories
{
    using System.Threading.Tasks;

    using EOD.DAL.Config;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class DepartmentsRepository : IDepartmentsRepository
    {
        private readonly ApplicationDbContext _context;

        public DepartmentsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetDepartments()
        {
            var departments = await _context.Departments.ToListAsync();
            return departments;
        }

        public async Task<Department> GetDepartmentById(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            return department;
        }

        public async Task<Department> GetDepartmentByName(string name)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Name == name);
            return department;
        }

        public async Task<int> AddDepartment(Department mappedDepartment)
        {
            mappedDepartment.IsDeleted = false;
            await _context.Departments.AddAsync(mappedDepartment);
            await _context.SaveChangesAsync();
            return mappedDepartment.Id;
        }

        public async Task<int> ChangeName(int id, string name)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            department.Name = name;
            await _context.SaveChangesAsync();
            return id;
        }

        public async Task<bool> AssignManager(int id, int userId)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            department.Manager = user;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            department.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
