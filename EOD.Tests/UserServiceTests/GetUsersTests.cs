using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EOD.BL.Dtos.UserDtos;
using EOD.BL.Services;
using EOD.DAL.Model;
using Moq;
using NUnit.Framework;

namespace EOD.Tests.UserServiceTests
{
    class GetUsersTests : UserServiceTestsSetup
    {
        [Test]
        public async Task GetUsers_ReturnsListOfAllNotDeletedUsers()
        {
            List<User> users = new List<User>();
            users.Add(new User
            {
                Email = "test@test.com",
                FirstName = "Test1",
                Id = 1,
                IsDeleted = false,
                LastName = "Testowy",
                Login = "test1",
                Role = "User"
            });
            users.Add(new User
            {
                Email = "test@test.com",
                FirstName = "Test2",
                Id = 2,
                IsDeleted = true,
                LastName = "Testowy",
                Login = "test2",
                Role = "User"
            });
            users.Add(new User
            {
                Email = "test@test.com",
                FirstName = "Test3",
                Id = 3,
                IsDeleted = false,
                LastName = "Testowy",
                Login = "test3",
                Role = "User"
            });

            List<GetUserDto> mappedUsers = new List<GetUserDto>();
            mappedUsers.Add(new GetUserDto
            {
                Email = "test@test.com",
                Role = "User",
                Id = 1,
                IsDeleted = false,
                LastName = "Testowy",
                Login = "test1",
                FirstName = "Test1"
            });
            mappedUsers.Add(new GetUserDto
            {
                Email = "test@test.com",
                Role = "User",
                Id = 3,
                IsDeleted = false,
                LastName = "Testowy",
                Login = "test3",
                FirstName = "Test3"
            });

            _usersRepositoryMock.Setup(x => x.GetUsers()).ReturnsAsync(users);
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.GetUsers();
            for (int i = 0; i < mappedUsers.Count; i++)
            {
                Assert.True(mappedUsers[i].AreEqual(result.Value[i]));
            }
        }
    }
}
