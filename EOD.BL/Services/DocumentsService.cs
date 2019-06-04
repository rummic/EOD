namespace EOD.BL.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using EOD.BL.Dtos;
    using EOD.BL.Dtos.DocumentDtos;
    using EOD.BL.Services.Interfaces;
    using EOD.BL.Validators;
    using EOD.Commons.Enumerables;
    using EOD.Commons.ErrorMessages;
    using EOD.Commons.Helpers;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Options;

    public class DocumentsService : IDocumentsService
    {
        private readonly string _documentsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Documents");


        private readonly IDocumentsRepository _documentsRepository;
        private readonly ICasesRepository _casesRepository;
        private readonly ISharedDocumentsRepository _sharedDocumentsRepository;
        private readonly IOptions<AppSettings> _appSettings;


        public DocumentsService(IHostingEnvironment hostingEnvironment, IDocumentsRepository documentsRepository, ICasesRepository casesRepository, IOptions<AppSettings> appSettings, ISharedDocumentsRepository sharedDocumentsRepository)
        {
            _documentsRepository = documentsRepository;
            _casesRepository = casesRepository;
            _appSettings = appSettings;
            _sharedDocumentsRepository = sharedDocumentsRepository;
            if (string.IsNullOrWhiteSpace(hostingEnvironment.WebRootPath))
            {
                hostingEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            if (!Directory.Exists(hostingEnvironment.WebRootPath) || !Directory.Exists(_documentsFolderPath))
            {
                Directory.CreateDirectory(_documentsFolderPath);
            }
        }

        public async Task<ResponseDto<string>> AddDocument(ClaimsPrincipal user, IFormFile document, int caseId)
        {
            Case caseFromDb = await _casesRepository.GetCaseById(caseId);
            ResponseDto<string> response = DocumentsValidator.ValidateAddDocument(caseFromDb, document, user);

            string filePath = GetAvailablePath(_documentsFolderPath, document.FileName);
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

        public async Task<ResponseDto<bool>> SendMail(SendDocumentMailDto mailDto)
        {
            var response = DocumentsValidator.ValidateSendMailDto(mailDto);
            if (response.HasErrors)
            {
                return response;
            }
            var shared = await _sharedDocumentsRepository.GetSharedDocument(mailDto.Id);
            if (shared == null)
            {
                response.AddError(DocumentErrors.CannotFindSharedDoc);
                return response;
            }

            try
            {
                await MailHelper.SendDocument(_appSettings.Value, shared.RecipientMail, mailDto.FrontRedirect + "?id=" + shared.Id);
            }
            catch
            {
                response.Value = false;
                return response;
            }

            response.Value = true;
            return response;
        }

        public async Task<ResponseDto<int>> AddSharedDocument(AddSharedDocumentDto documentDto)
        {
            var document = await _documentsRepository.GetDocumentByName(documentDto.DocumentName);
            var response = DocumentsValidator.ValidateSendMail(document, documentDto);
            if (response.HasErrors)
            {
                return response;
            }
            var sharedDocument = CreateSharedDocument(documentDto.Recipient,  documentDto.DocumentName);
            await _sharedDocumentsRepository.AddSharedDocument(sharedDocument);
            response.Value = sharedDocument.Id;
            return response;
        }

        public async Task<ResponseDto<string>> DocumentSeen(int id)
        {
            var shared = await _sharedDocumentsRepository.SeenSharedDocument(id);
            return new ResponseDto<string> { Value = shared.DocumentName };
        }

        public async Task<ResponseDto<List<SharedDocument>>> GetSharedDocuments()
        {
            var docs = await _sharedDocumentsRepository.GetSharedDocuments();
            return new ResponseDto<List<SharedDocument>>() { Value = docs };
        }

        private SharedDocument CreateSharedDocument(string recipient, string documentUrl)
        {
            return new SharedDocument
            {
                DocumentName = documentUrl.Split('/').Last(),
                RecipientMail = recipient,
                SharedTime = DateTime.UtcNow
            };
        }

        private string GetAvailablePath(string photosFolderPath, string photoFileName)
        {
            return Path.Combine(
                photosFolderPath,
                DateTime.UtcNow.ToString("HH-mm-ss-fff_dd-MM-yyyy_") + photoFileName.Replace(" ", "-"));
        }
    }
}
