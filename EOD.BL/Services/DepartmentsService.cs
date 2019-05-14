namespace EOD.BL.Services
{
    using System.Threading.Tasks;

    using AutoMapper;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DepartmentDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.BL.Validators;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    public class DepartmentsService : IDepartmentsService
    {
        private readonly IDepartmentsRepository _departmentsRepository;

        public DepartmentsService(IDepartmentsRepository departmentsRepository)
        {
            _departmentsRepository = departmentsRepository;
        }

        public async Task<ResponseDto<int>> AddDepartment(AddDepartmentDto departmentDto)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentByName(departmentDto.Name);
            ResponseDto<int> response = DepartmentsValidator.ValidateAddDepartment(departmentFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            var mappedDepartment = Mapper.Map<Department>(departmentDto);
            response.Value = await _departmentsRepository.AddDepartment(mappedDepartment);
            return response;
        }
    }
}
