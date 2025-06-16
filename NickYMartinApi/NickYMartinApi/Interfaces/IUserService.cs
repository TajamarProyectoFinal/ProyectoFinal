using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;

namespace NickYMartinApi.Interfaces
{
    public interface IUserService
    {
        public Task<User> CreateUser(UserViewmodel user);
        public Task<string> LoginUser(string email, string password);
    }
}
