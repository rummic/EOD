using System;
using System.Collections.Generic;
using System.Text;

namespace EOD.Tests.UserServiceTests
{
    using AutoMapper;

    using EOD.BL.Dtos.CaseDtos;
    using EOD.BL.Dtos.DepartmentDtos;
    using EOD.BL.Dtos.DocumentDtos;
    using EOD.BL.Dtos.DocumentTypeDtos;
    using EOD.BL.Dtos.UserDtos;
    using EOD.Commons.Helpers;
    using EOD.DAL.Model;
    using EOD.DAL.Repositories.Interfaces;

    using Microsoft.Extensions.Options;

    using Moq;

    public class UserServiceTestsSetup : IDisposable
    {
        protected readonly Mock<IUsersRepository> _usersRepositoryMock = new Mock<IUsersRepository>();
        protected readonly Mock<IOptions<AppSettings>> _appSettingsMock = new Mock<IOptions<AppSettings>>();

        public UserServiceTestsSetup()
        {
            AutoMapperInitializer.Initialize();
        }

        public void Dispose()
        {
            _usersRepositoryMock.Reset();
            _appSettingsMock.Reset();
        }
    }
}
