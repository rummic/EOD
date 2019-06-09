using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using EOD.BL.Dtos.UserDtos;
using EOD.BL.Services;
using EOD.Commons.ErrorMessages;
using EOD.Commons.ExtensionMethods;
using EOD.Commons.Helpers;
using EOD.DAL.Model;
using Moq;
using NUnit.Framework;

namespace EOD.Tests.UserServiceTests
{
    class AddUserTests : UserServiceTestsSetup
    {
        [Test]
        public async Task AddUser_EmptyLogin_ReturnsEmptyLoginError()
        {
            AddUserDto userToDb = new AddUserDto
            {
                Login = "",
                Password = "password",
                FirstName = "Test",
                LastName = "Testowy",
                Email = "test@test.com",
                Role = "User"
            };
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.AddUser(userToDb);
            Assert.True(result.Errors.Contains(UserErrors.EmptyLogin));
        }

        [Test]
        public async Task AddUser_EmptyFirstName_ReturnsEmptyFirstNameError()
        {
            AddUserDto userToDb = new AddUserDto
            {
                Login = "test",
                Password = "password",
                FirstName = "",
                LastName = "Testowy",
                Email = "test@test.com",
                Role = "User"
            };
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.AddUser(userToDb);
            Assert.True(result.Errors.Contains(UserErrors.EmptyFirstName));
        }

        [Test]
        public async Task AddUser_EmptyLastName_ReturnsEmptyLastNameError()
        {
            AddUserDto userToDb = new AddUserDto
            {
                Login = "test",
                Password = "password",
                FirstName = "Test",
                LastName = "",
                Email = "test@test.com",
                Role = "User"
            };
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.AddUser(userToDb);
            Assert.True(result.Errors.Contains(UserErrors.EmptyLastName));
        }

        [Test]
        public async Task AddUser_EmptyEmail_ReturnsEmptyEmailError()
        {
            AddUserDto userToDb = new AddUserDto
            {
                Login = "test",
                Password = "password",
                FirstName = "Test",
                LastName = "Testowy",
                Email = "",
                Role = "User"
            };
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.AddUser(userToDb);
            Assert.True(result.Errors.Contains(UserErrors.EmptyEmail));
        }

        [Test]
        public async Task AddUser_InvalidEmailFormat_ReturnsEmailInvalidError()
        {
            AddUserDto userToDb = new AddUserDto
            {
                Login = "test",
                Password = "password",
                FirstName = "Test",
                LastName = "Testowy",
                Email = "testtest",
                Role = "User"
            };
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.AddUser(userToDb);
            Assert.True(result.Errors.Contains(UserErrors.EmailInvalid));
        }

        [Test]
        public async Task AddUser_ValidData_ReturnsNoErrors()
        {
            AddUserDto userToDb = new AddUserDto
            {
                Login = "test",
                Password = "Password",
                FirstName = "Test",
                LastName = "Testowy",
                Email = "test@test.com",
                Role = "User"
            };

            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.AddUser(userToDb);
            Assert.True(!result.HasErrors);
        }
    }
}
