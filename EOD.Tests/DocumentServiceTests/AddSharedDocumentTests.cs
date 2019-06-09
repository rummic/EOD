namespace EOD.Tests.DocumentServiceTests
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using EOD.BL.Dtos.DocumentDtos;
    using EOD.BL.Services;
    using EOD.Commons.ErrorMessages;
    using EOD.DAL.Model;

    using Moq;

    using NUnit.Framework;

    public class AddSharedDocumentTests : DocumentServiceTestsSetup
    {
        [Test]
        public async Task AddSharedDocument_InvalidName_ReturnsNotFoundByNameDtoError()
        {
            var document = new AddSharedDocumentDto
            {
                DocumentName = "invalidname",
                Recipient = "recipient@mail.com"
            };
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.AddSharedDocument(document);
            Assert.True(result.Errors.Any(x => x == DocumentErrors.NotFoundByName));
        }

        [Test]
        public async Task AddSharedDocument_InvalidRecipient_ReturnsInvalidRecipientError()
        {
            var document = new AddSharedDocumentDto
            {
                DocumentName = "ValidName",
                Recipient = ""
            };
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.AddSharedDocument(document);
            Assert.True(result.Errors.Any(x => x == DocumentErrors.InvalidRecipient));
        }

        [Test]
        public async Task AddSharedDocument_Valid_ReturnsAddedSharedDocumentId()
        {
            var addSharedDocumentDto = new AddSharedDocumentDto
            {
                DocumentName = "ValidName.txt",
                Recipient = "recipient@mail.com"
            };
            var document = new Document { Path = "ValidName.txt", Status = "Sent" };
            var sharedDocument = new SharedDocument()
            {
                DocumentName = "ValidName.txt",
                RecipientMail = "recipient@mail.com",
                Seen = false,
                SharedTime = DateTime.UtcNow
            };
            _sharedDocumentsRepositoryMock.Setup(x => x.AddSharedDocument(sharedDocument)).ReturnsAsync(sharedDocument);
            _documentsRepositoryMock.Setup(x => x.GetDocumentByName(addSharedDocumentDto.DocumentName)).ReturnsAsync(document);
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.AddSharedDocument(addSharedDocumentDto);
            Assert.False(result.HasErrors);
        }
    }
}
