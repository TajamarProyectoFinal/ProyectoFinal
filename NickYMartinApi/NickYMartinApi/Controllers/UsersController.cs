using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.Dto;
using NickYMartinApi.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody]UserViewmodel user)
        {
             await _userService.CreateUser(user);

            return Ok("Usuario creado correctamente");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody]userLoginDto user)
        {
            var token = await _userService.LoginUser(user.Email, user.Password);

            if (token != null) {
                return Ok(token);
            }
            else
            {
                return Unauthorized();
            }

        }
    }
}
