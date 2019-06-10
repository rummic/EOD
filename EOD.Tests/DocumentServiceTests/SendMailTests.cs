using System;
using System.Collections.Generic;
using System.Text;

namespace EOD.Tests.DocumentServiceTests
{
    using System.Linq;
    using System.Threading.Tasks;

    using EOD.BL.Services;
    using EOD.BL.Services.Interfaces;
    using EOD.Commons.ErrorMessages;

    using NUnit.Framework;

    public class SendMailTests : DocumentServiceTestsSetup
    {

        
        [Test]
        public async Task SendMail_InvalidRedirectUrl_ReturnsInvalidRedirectUrlError()
        {
            var invalidRedirect = "";
            var id = 1;
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.SendMail(id, invalidRedirect);
            Assert.True(result.Errors.Any(x => x == DocumentErrors.InvalidFrontRedirect));
        }

        [Test]
        public async Task SendMail_InvalidId_ReturnsInvalidIdError()
        {
            var invalidRedirect = "testapi.com/Redirect";
            var id = -1;
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.SendMail(id, invalidRedirect);
            Assert.True(result.Errors.Any(x => x == DocumentErrors.InvalidId));
        }

        [Test]
        public async Task SendMail_EmptyId_ReturnsSharedDocumentNotFoundError()
        {
            var invalidRedirect = "testapi.com/Redirect";
            var id = 99999;
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.SendMail(id, invalidRedirect);
            Assert.True(result.Errors.Any(x => x == DocumentErrors.CannotFindSharedDoc));
        }

        [Test]
        public async Task SendMail_WrongCredentials_ReturnsMailNotSentErrorError()
        {
            var invalidRedirect = "testapi.com/Redirect";
            var id = 1;
            var service = new DocumentsService(_hostingEnvironmentMock.Object, _documentsRepositoryMock.Object, _casesRepositoryMock.Object, _appSettingsMock.Object, _sharedDocumentsRepositoryMock.Object);
            var result = await service.SendMail(id, invalidRedirect);
            Assert.True(!result.Value);
        }
    }
}
