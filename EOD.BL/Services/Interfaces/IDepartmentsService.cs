namespace EOD.BL.Services.Interfaces
{
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DepartmentDtos;

    public interface IDepartmentsService
    {
        Task<ResponseDto<int>> AddDepartment(AddDepartmentDto departmentDto);
    }
}
