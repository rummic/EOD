namespace EOD.Tests
{
    using System.Threading.Tasks;

    using EOD.BL.Dtos.UserDtos;
    using EOD.BL.Services;
    using EOD.Commons.ErrorMessages;
    using EOD.DAL.Model;
    using EOD.Tests.UserServiceTests;

    using Moq;

    using NUnit.Framework;

    public class GetUserByIdTests : UserServiceTestsSetup
    {

        [Test]
        public async Task GetUserById_InvalidId_ReturnsNotFoundByIdError()
        {
            var id = -1;
            User user = null;
            _usersRepositoryMock.Setup(x => x.GetUserById(id, true)).ReturnsAsync(user);

            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.GetUserById(id);

            Assert.True(result.Errors.Contains(UserErrors.NotFoundById));
        }

        [Test]
        public async Task GetUserById_ValidId_ReturnsMappedUser()
        {
            var user = new User
            {
                Email = "test@test.com",
                FirstName = "Test",
                Id = 1,
                IsDeleted = false,
                LastName = "Testowy",
                Login = "test",
                Role = "User"
            };
            GetUserDto mappedUser = new GetUserDto
            {
                Email = "test@test.com",
                Role = "User",
                Id = 1,
                IsDeleted = false,
                LastName = "Testowy",
                Login = "test",
                FirstName = "Test"
            };
            var id = 1;
            _usersRepositoryMock.Setup(x => x.GetUserById(id, true)).ReturnsAsync(user);
            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.GetUserById(id);
            Assert.True(mappedUser.AreEqual(result.Value));
        }

    }
}