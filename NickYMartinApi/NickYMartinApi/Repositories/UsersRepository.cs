using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;
using NickYMartinApi.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace NickYMartinApi.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        public ApplicationDbContext _context { get; set; }

        public UsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(UserViewmodel uservm)
        {

            Role rol = await _context.Roles.SingleOrDefaultAsync(r => r.NombreRol == IUserRoles.CLIENTE);

            User user = new User()
            {
                Name = uservm.Name,
                Phone = uservm.Phone,
                Email = uservm.Email,
                RoleId = rol.RolId                               
            };
    
            var passwordHasher = new PasswordHasher<User>();            
            user.PasswordHash = passwordHasher.HashPassword(user, uservm.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> GetUserByEmailPassword(string email, string password)
        {

            User user = _context.Users.Include(u=> u.Role).SingleOrDefault(u => u.Email == email);

            if (user == null) {
                return null;
            }

            var passwordHaser = new PasswordHasher<User>();

            var result = passwordHaser.VerifyHashedPassword(user, user.PasswordHash, password);

            if (result == PasswordVerificationResult.Success) {
                return user;
            }
            else if(result == PasswordVerificationResult.SuccessRehashNeeded)
            {
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}
