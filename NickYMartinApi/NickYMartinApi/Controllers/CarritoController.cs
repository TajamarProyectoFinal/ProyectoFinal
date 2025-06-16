using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.Services;
using System.Security.Claims;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarritoController : ControllerBase
    {
        private readonly ICarritoService _carritoService;
        private readonly IProductoService _productoService;

        public CarritoController(ICarritoService carritoService, IProductoService productoService)
        {
            _carritoService = carritoService;
            _productoService = productoService;
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCarrito(Guid userId)
        {
            Carrito? carrito = await _carritoService.GetUserCarrito(userId);

            return Ok(carrito);
        }

        [HttpPost]
        public async Task<IActionResult> AddCarritoItem(Guid idProducto, int cantidad, string productoMainImageUrl)
        {
            Guid userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));

            Producto? producto = await _productoService.GetProducto(idProducto);

            if (producto != null)
            {
                ItemCarrito itemCarrito = new ItemCarrito()
                {
                    IdProducto = idProducto,
                    Cantidad = cantidad,
                    FechaCreacion = DateTime.Now,
                    PrecioUnitario = producto.Precio,
                    Subtotal = producto.Precio * cantidad,
                    MainImageUrl = productoMainImageUrl,
                };
                Carrito carrito = await _carritoService.CreateOrAddUserCarrito(userId, itemCarrito);
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpDelete("removeItem/{id}")]
        public async Task<IActionResult> RemoveCarritoItem(Guid idItemCarrito)
        {
            Guid userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));
            bool response = await _carritoService.RemoveItemCarrito(userId, idItemCarrito);

            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> ClearCarritoItems()
        {
            Guid userId = new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier));
            bool response = await _carritoService.ClearCarritoItems(userId);

            return Ok(response);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUserCarrito(Guid userId)
        {
            bool response = await _carritoService.DeleteUserCarrito(userId);

            return Ok(response);
        }
    }
}
