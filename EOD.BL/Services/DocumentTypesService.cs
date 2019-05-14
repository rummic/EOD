namespace EOD.BL.Services
{
    using AutoMapper;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentTypeDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.BL.Validators;

    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class DocumentTypesService : IDocumentTypesService
    {
        private readonly IDocumentTypesRepository _documentTypesRepository;
        private readonly IDepartmentsRepository _departmentsRepository;

        public DocumentTypesService(IDocumentTypesRepository documentTypesRepository, IDepartmentsRepository departmentsRepository)
        {
            _documentTypesRepository = documentTypesRepository;
            _departmentsRepository = departmentsRepository;
        }

        public async Task<ResponseDto<List<GetDocumentTypeDto>>> GetDocumentTypes(int departmentId)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(departmentId);
            ResponseDto<List<GetDocumentTypeDto>> response = DocumentTypesValidator.ValidateGetDocumentTypes(departmentFromDb);
            if (response.HasErrors)
            {
                return response;
            }
            var DocumentTypesFromDb = await _documentTypesRepository.GetDocumentTypes(departmentFromDb);
            response.Value = Mapper.Map<List<GetDocumentTypeDto>>(DocumentTypesFromDb);
            return response;
        }

        public async Task<ResponseDto<int>> AddDocumentType(AddDocumentTypeDto documentTypeToAdd)
        {
            var departmentFromDb = await _departmentsRepository.GetDepartmentById(documentTypeToAdd.DepartmentId);
            ResponseDto<int> response = DocumentTypesValidator.ValidateAddDocumentType(departmentFromDb, documentTypeToAdd);
            if (response.HasErrors)
            {
                return response;
            }

            var documentTypeToDb = Mapper.Map<DocumentType>(documentTypeToAdd);
            documentTypeToDb.Department = departmentFromDb;
            response.Value = await _documentTypesRepository.AddDocumentType(documentTypeToDb);
            return response;
        }

        public async Task<ResponseDto<bool>> DeleteDocumentType(int id)
        {
            var documentTypeFromDb = await _documentTypesRepository.GetDocumentTypeById(id);
            ResponseDto<bool> response = DocumentTypesValidator.ValidateDeleteDocumentType(documentTypeFromDb);
            if (response.HasErrors)
            {
                return response;
            }

            response.Value = await _documentTypesRepository.DeleteDocumentType(documentTypeFromDb);
            return response;
        }
    }
}
