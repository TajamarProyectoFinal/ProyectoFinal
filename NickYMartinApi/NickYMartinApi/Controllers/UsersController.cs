using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
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

        [HttpGet("{email}-{password}")]
        public async Task<IActionResult> GetUser(string email, string password)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            return Ok();
        }
    }
}
