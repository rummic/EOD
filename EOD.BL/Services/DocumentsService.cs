namespace EOD.BL.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Services.Interfaces;
    using EOD.BL.Validators;
    using EOD.Commons.Enumerables;
    using EOD.Commons.ErrorMessages;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;

    public class DocumentsService : IDocumentsService
    {
        private readonly string _photosFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Photos");


        private readonly IDocumentsRepository _documentsRepository;
        private readonly ICasesRepository _casesRepository;

        public DocumentsService(IHostingEnvironment hostingEnvironment, IDocumentsRepository documentsRepository, ICasesRepository casesRepository)
        {
            _documentsRepository = documentsRepository;
            _casesRepository = casesRepository;
            if (string.IsNullOrWhiteSpace(hostingEnvironment.WebRootPath))
            {
                hostingEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            if (!Directory.Exists(hostingEnvironment.WebRootPath) || !Directory.Exists(_photosFolderPath))
            {
                Directory.CreateDirectory(_photosFolderPath);
            }
        }

        public async Task<ResponseDto<string>> AddDocument(ClaimsPrincipal user, IFormFile document, int caseId)
        {
            Case caseFromDb = await _casesRepository.GetCaseById(caseId);
            ResponseDto<string> response = DocumentsValidator.ValidateAddDocument(caseFromDb, document, user);

            string filePath = GetAvailablePath(_photosFolderPath, document.FileName);
            Document documentToAdd = new Document { Path = filePath, Status = Status.Sent, Case = caseFromDb };

            try
            {
                using (var fs = new FileStream(filePath, FileMode.Create))
                {
                    await document.CopyToAsync(fs);
                }
            }
            catch
            {
                response.AddError(DocumentErrors.CannotSave);
                return response;
            }

            try
            {
                await _documentsRepository.AddDocument(documentToAdd);
                var split = filePath.Split('\\');
                response.Value = string.Join('/', split.Skip(split.Length - 2));
                return response;
            }
            catch
            {
                File.Delete(filePath);
                response.AddError(DocumentErrors.InfoSaveFailed);
                return response;
            }

        }
        private string GetAvailablePath(string photosFolderPath, string photoFileName)
        {
            return Path.Combine(
                photosFolderPath,
                DateTime.UtcNow.ToString("HH-mm-ss-fff_dd-MM-yyyy_") + photoFileName);
        }
    }
}
