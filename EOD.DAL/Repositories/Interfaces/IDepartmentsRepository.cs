using System.Collections.Generic;

namespace EOD.DAL.Repositories.Interfaces
{
    using EOD.DAL.Model;

    using System.Threading.Tasks;

    public interface IDepartmentsRepository
    {
        Task<Department> GetDepartmentById(int id);

        Task<Department> GetDepartmentByName(string name);

        Task<int> AddDepartment(Department mappedDepartment);
        Task<IEnumerable<Department>> GetDepartments();
        Task<int> ChangeName(int id, string name);
        Task<bool> AssignManager(int id, int userId);
        Task<bool> DeleteDepartment(int id);
    }
}