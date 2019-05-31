using System.Collections.Generic;
using EOD.DAL.Model;

namespace EOD.BL.Services.Interfaces
{
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DepartmentDtos;

    public interface IDepartmentsService
    {
        Task<ResponseDto<int>> AddDepartment(AddDepartmentDto departmentDto);
        Task<ResponseDto<List<Department>>> GetDepartments(bool allDepartments = false);
        Task<ResponseDto<Department>> GetDepartmentById(int id);
        Task<ResponseDto<int>> ChangeName(int id, string name);
        Task<ResponseDto<bool>> AssignManager(int id, int userId);
        Task<ResponseDto<bool>> DeleteDepartment(int id);
    }
}
