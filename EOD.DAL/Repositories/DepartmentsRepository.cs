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
            await _context.Departments.AddAsync(mappedDepartment);
            await _context.SaveChangesAsync();
            return mappedDepartment.Id;
        }
    }
}
