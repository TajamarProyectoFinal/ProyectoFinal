using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;

namespace NickYMartinApi.Interfaces
{
    public interface IUsersRepository
    {
        public Task<User> CreateUser(UserViewmodel user);
        public Task<User> GetUserByEmailPassword(string email, string password);
    }
}
