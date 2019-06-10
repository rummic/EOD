using System;
using System.Collections.Generic;
using System.Text;

namespace EOD.Tests.DocumentServiceTests
{
    using EOD.Commons.Helpers;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Options;

    using Moq;

    public class DocumentServiceTestsSetup : IDisposable
    {
        protected readonly Mock<IDocumentsRepository> _documentsRepositoryMock = new Mock<IDocumentsRepository>();
        protected readonly Mock<ICasesRepository> _casesRepositoryMock = new Mock<ICasesRepository>();
        protected readonly Mock<ISharedDocumentsRepository> _sharedDocumentsRepositoryMock = new Mock<ISharedDocumentsRepository>();
        protected readonly Mock<IOptions<AppSettings>> _appSettingsMock = new Mock<IOptions<AppSettings>>();
        protected readonly Mock<IHostingEnvironment> _hostingEnvironmentMock = new Mock<IHostingEnvironment>();

        public DocumentServiceTestsSetup()
        {
            AutoMapperInitializer.Initialize();
        }

        public void Dispose()
        {
            _documentsRepositoryMock.Reset();
            _casesRepositoryMock.Reset();
            _sharedDocumentsRepositoryMock.Reset();
            _appSettingsMock.Reset();
            _hostingEnvironmentMock.Reset();
        }
    }
}
