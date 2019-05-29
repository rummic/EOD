namespace EOD.BL.Validators
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;

    using EOD.BL.Dtos;
    using EOD.Commons.ErrorMessages;
    using EOD.DAL.Model;

    using Microsoft.AspNetCore.Http;

    public static class DocumentsValidator
    {

        private static readonly List<string> _allowedExtensions = new List<string> { ".jpeg", ".jpg", ".png", ".pdf", ".docx", ".doc", ".xlsx", ".xls" };

        public static ResponseDto<string> ValidateAddDocument(Case caseFromDb, IFormFile document, ClaimsPrincipal user)
        {
            var result = new ResponseDto<string>();
            if (document.Length <= 0)
            {
                result.AddError(DocumentErrors.EmptyFile);
                return result;
            }

            if (_allowedExtensions.All(x => x != Path.GetExtension(document.FileName)))
            {
                result.AddError(DocumentErrors.WrongExtension);
                return result;
            }

            if (caseFromDb == null)
            {
                result.AddError(CaseErrors.NotFoundById);
                return result;
            }

            if (user.Identity.Name != caseFromDb.Sender.Login)
                result.AddError(UserErrors.NotAllowed);

            return result;

        }

        public static ResponseDto<bool> ValidateSendMail(Document document)
        {
            var response = new ResponseDto<bool>();
            if (document == null)
            {
                response.AddError(DocumentErrors.NotFoundByName);
            }

            return response;
        }
    }
}
