using System;
using System.Collections.Generic;
using System.Text;
using EOD.BL.Dtos;
using EOD.BL.Dtos.CaseDtos;
using EOD.Commons.Enumerables;
using EOD.Commons.ErrorMessages;
using EOD.DAL.Model;

namespace EOD.BL.Validators
{
    public static class CasesValidator
    {
        public static ResponseDto<GetCaseDto> ValidateGetCaseById(Case caseFromDb)
        {
            ResponseDto<GetCaseDto> response = new ResponseDto<GetCaseDto>();
            if (caseFromDb == null)
            {
                response.AddError(CaseErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<int> ValidateAddCase(AddCaseDto caseToAdd, Department department)//, User user)
        {
            var response = new ResponseDto<int>();
            if(string.IsNullOrEmpty(caseToAdd.Title))
                response.AddError(CaseErrors.EmptyTitle);
            if(department == null)
                response.AddError(DepartmentErrors.NotFoundById);
            //if(user == null)
                //response.AddError(UserErrors.NotFoundByLogin);
            return response;
        }

        public static ResponseDto<int> ValidateChangeStatus(Case caseFromDb, /*User userFromDb,*/ string status)
        {
            var response = new ResponseDto<int>();
            if(!(status == Status.Accepted || status == Status.Rejected || status == Status.Sent))
                response.AddError(CaseErrors.WrongStatus);
            if(caseFromDb == null)
                response.AddError(CaseErrors.NotFoundById);
            /*if(userFromDb == null)
                response.AddError(UserErrors.NotFoundByLogin);
            else if (userFromDb.Role == Role.Admin && caseFromDb.Department.Manager != userFromDb)
                    response.AddError(CaseErrors.NotAllowed);*/

            return response;
        }

        public static ResponseDto<bool> ValidateDeleteCase(Case caseFromDb/*, User userFromDb*/)
        {
            var response = new ResponseDto<bool>();
            if(caseFromDb == null)
                response.AddError(CaseErrors.NotFoundById);
            /*if(userFromDb == null)
                response.AddError(UserErrors.NotFoundByLogin);
            else if (userFromDb.Role == Role.Admin && caseFromDb.Department.Manager != userFromDb)
                response.AddError(CaseErrors.NotAllowed);*/

            return response;
        }
    }
}
