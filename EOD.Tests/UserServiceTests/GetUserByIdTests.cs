namespace EOD.Tests
{
    using System.Threading.Tasks;

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
            _usersRepositoryMock.Setup(x => x.GetUserById(id, false)).ReturnsAsync(user);

            var service = new UsersService(_usersRepositoryMock.Object, _appSettingsMock.Object);
            var result = await service.GetUserById(id);
            
            Assert.True(result.Errors.Contains(UserErrors.NotFoundById));
        }
    }
}