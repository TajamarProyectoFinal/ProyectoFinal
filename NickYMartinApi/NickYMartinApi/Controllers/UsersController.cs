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
        private readonly IDireccionService _direccionService;

        public UsersController(IUserService userService, IDireccionService direccionService)
        {
            _userService = userService;
            _direccionService = direccionService;
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

        //Direcciones

        [HttpPost("direccion")]
        public async Task<IActionResult> AddUserDireccion([FromBody] Direccion direccion)
        {
            Direccion direccionSubida = await _direccionService.AddUserDireccion(direccion);

            return Ok(direccionSubida);
        }

        [HttpPost("direcciones")]
        public async Task<IActionResult> AddUserDirecciones([FromBody] List<Direccion> direcciones)
        {
            bool response = await _direccionService.AddUserListDirecciones(direcciones);

            if (!response) {
                return BadRequest("No se han podido añadir las direcciones");
            }

            return Ok("Se ha agregado la lista de direcciones correctamente");
        }

        [HttpDelete("direccion/{id}")]
        public async Task<IActionResult> RemoveUserDireccion(Guid id)
        {
            bool response = await _direccionService.RemoveUserDireccion(id);

            if (!response)
            {
                return BadRequest("No se ha podido eliminar la direccion");
            }

            return Ok("Se ha eliminado la direccion correctamente");
        }


        [HttpGet("direcciones")]
        public async Task<IActionResult> GetUserDirecciones(Guid userId)
        {
            List<Direccion> direcciones = await _direccionService.GetUserDirecciones(userId);

            return Ok(direcciones);
        }

        [HttpPut("direccion")]
        public async Task<IActionResult> UpdateUserDireccion([FromBody]Direccion direccion)
        {
            Direccion direccionActualizada = await _direccionService.UpdateUserDireccion(direccion);

            return Ok(direccionActualizada);
        }

        [HttpGet("direccion")]
        public async Task<IActionResult> GetUserDireccion([FromForm] Guid idDireccion)
        {
            Direccion direccion = await _direccionService.GetDireccion(idDireccion);

            return Ok(direccion);
        }
    }
}
