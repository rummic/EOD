using System.Collections.Generic;
using System.Linq;

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
        private readonly IUsersRepository _userRepository;

        public DepartmentsService(IDepartmentsRepository departmentsRepository, IUsersRepository userRepository)
        {
            _departmentsRepository = departmentsRepository;
            _userRepository = userRepository;
        }

        public async Task<ResponseDto<List<Department>>> GetDepartments(bool allDepartments = false)
        {
            var response = new ResponseDto<List<Department>>();
            var departmentsFromDb = await _departmentsRepository.GetDepartments();
            if (allDepartments)
            {
                response.Value = departmentsFromDb.ToList();
            }
            else
            {
                response.Value = departmentsFromDb.Where(x => !x.IsDeleted).ToList();
            }

            return response;
        }

        public async Task<ResponseDto<Department>> GetDepartmentById(int id)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(id);
            ResponseDto<Department> response = DepartmentsValidator.ValidateGetDepartmentById(departmentFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = departmentFromDb;
            return response;
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

        public async Task<ResponseDto<int>> ChangeName(int id, string name)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(id);
            var departmentWithName = await _departmentsRepository.GetDepartmentByName(name);
            ResponseDto<int> response = DepartmentsValidator.ValidateChangeName(departmentFromDb, departmentWithName, name);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _departmentsRepository.ChangeName(id, name);
            return response;
        }

        public async Task<ResponseDto<bool>> AssignManager(int id, int userId)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(id);
            var userFromDb = await _userRepository.GetUserById(userId);
            ResponseDto<bool> response = DepartmentsValidator.ValidateAssignManager(departmentFromDb, userFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _departmentsRepository.AssignManager(id, userId);
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteDepartment(int id)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(id);
            ResponseDto<bool> response = DepartmentsValidator.ValidateDeleteDepartment(departmentFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _departmentsRepository.DeleteDepartment(id);
            return response;
        }
    }
}
