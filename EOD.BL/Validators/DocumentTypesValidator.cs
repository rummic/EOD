namespace EOD.BL.Validators
{
    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentTypeDtos;
    using EOD.Commons.ErrorMessages;
    using EOD.DAL.Model;

    using System.Collections.Generic;

    public static class DocumentTypesValidator
    {
        public static ResponseDto<List<GetDocumentTypeDto>> ValidateGetDocumentTypes(Department departmentFromDb)
        {
            ResponseDto<List<GetDocumentTypeDto>> response = new ResponseDto<List<GetDocumentTypeDto>>();
            if (departmentFromDb == null)
            {
                response.AddError(DepartmentErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<int> ValidateAddDocumentType(Department departmentFromDb, AddDocumentTypeDto documentTypeToAdd)
        {
            ResponseDto<int> response = new ResponseDto<int>();
            if (departmentFromDb == null)
            {
                response.AddError(DepartmentErrors.NotFoundById);
            }

            if (string.IsNullOrEmpty(documentTypeToAdd.Name))
            {
                response.AddError(DocumentTypeErrors.EmptyName);
            }

            return response;
        }

        public static ResponseDto<bool> ValidateDeleteDocumentType(DocumentType documentTypeFromDb)
        {
            var response = new ResponseDto<bool>();
            if(documentTypeFromDb == null)
                response.AddError(DocumentTypeErrors.NotFoundById);
            return response;
        }
    }
}
