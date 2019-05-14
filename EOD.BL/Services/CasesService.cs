namespace EOD.BL.Services
{
    using AutoMapper;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.CaseDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.BL.Validators;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class CasesService : ICasesService
    {
        private readonly ICasesRepository _casesRepository;
        private readonly IUsersRepository _usersRepository;
        private readonly IDepartmentsRepository _departmentsRepository;

        public CasesService(ICasesRepository casesRepository, IDepartmentsRepository departmentsRepository, IUsersRepository usersRepository)
        {
            _casesRepository = casesRepository;
            _usersRepository = usersRepository;
            _departmentsRepository = departmentsRepository;
        }

        public async Task<ResponseDto<GetCaseDto>> GetCaseById(int id)
        {
            var caseFromDb = await _casesRepository.GetCaseById(id);
            ResponseDto<GetCaseDto> response = CasesValidator.ValidateGetCaseById(caseFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            var mappedCase = Mapper.Map<GetCaseDto>(caseFromDb);
            response.Value = mappedCase;
            return response;
        }

        public async Task<ResponseDto<List<GetCaseDto>>> GetCases(bool allCases = false)
        {
            ResponseDto<List<GetCaseDto>> response = new ResponseDto<List<GetCaseDto>>();
            var casesFromDb = await _casesRepository.GetCases();
            var mappedCases = allCases ? 
                Mapper.Map<List<GetCaseDto>>(casesFromDb) : 
                Mapper.Map<List<GetCaseDto>>(casesFromDb.Where(x => !x.IsDeleted));
            response.Value = mappedCases;
            return response;
        }

        public async Task<ResponseDto<List<GetCaseDto>>> GetCasesForManager(ClaimsPrincipal user)
        {
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            ResponseDto<List<GetCaseDto>> response = CasesValidator.ValidateGetCasesForManager(userFromDb);
            var casesFromDb = await _casesRepository.GetCasesForManager(userFromDb);
            response.Value = Mapper.Map<List<GetCaseDto>>(casesFromDb);
            return response;
        }

        public async Task<ResponseDto<int>> AddCase(ClaimsPrincipal user, AddCaseDto caseToAdd)
        {
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(caseToAdd.DepartmentId);
            var response = CasesValidator.ValidateAddCase(caseToAdd, departmentFromDb, userFromDb);
            if (response.HasErrors)
                return response;

            var caseToDb = Mapper.Map<Case>(caseToAdd);
            caseToDb.Status = "Sent";
            caseToDb.IsDeleted = false;
            caseToDb.Department = departmentFromDb;
            caseToDb.SendDate = DateTime.Now;
            caseToDb.Sender = userFromDb;
            response.Value = await _casesRepository.AddCase(caseToDb);
            return response;
        }

        public async Task<ResponseDto<int>> ChangeStatus(ClaimsPrincipal user, int id, string status)
        {
            var caseFromDb = await _casesRepository.GetCaseById(id);
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            var response = CasesValidator.ValidateChangeStatus(caseFromDb, userFromDb, status);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _casesRepository.ChangeStatus(caseFromDb, status);
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteCase(ClaimsPrincipal user, int id)
        {
            var caseFromDb = await _casesRepository.GetCaseById(id);
            var userFromDb = await _usersRepository.GetUserByLogin(user.Identity.Name);
            ResponseDto<bool> response = CasesValidator.ValidateDeleteCase(caseFromDb, userFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _casesRepository.DeleteCase(caseFromDb);
            return response;
        }
    }
}
