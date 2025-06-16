using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NickYMartinApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IConfiguration _configuration; 
        public UserService(IUsersRepository userRepository, IConfiguration configuration)
        {
            _usersRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<User> CreateUser(UserViewmodel user)
        {
            User userCreated = await _usersRepository.CreateUser(user);
            
            return userCreated;
        }

        //Al hacer login devolver el token
        public async Task<string?> LoginUser(string email, string password)
        {
            User user = await _usersRepository.GetUserByEmailPassword(email, password);

            if (user != null)
            {
                var token = GenerarToken(user.Name);

                return token;
            }

            return null;
        }

        private string GenerarToken(string name)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
