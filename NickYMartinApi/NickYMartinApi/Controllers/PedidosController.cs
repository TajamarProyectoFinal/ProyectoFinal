using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.Services;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {

        private readonly IPedidoService _pedidoService;

        public PedidosController(IPedidoService pedidoService)
        {
            _pedidoService = pedidoService;
        }

        [HttpGet("{idPedido}")]
        public async Task<IActionResult> PedidoDetalles(Guid idPedido)
        {
            Pedido? pedido = await _pedidoService.GetPedido(idPedido);

            return Ok(pedido);
        }

        [HttpPost]
        public async Task<IActionResult> AddPedido([FromForm]Guid userId,[FromForm] Guid idDireccion)
        {
            Pedido? pedido = await _pedidoService.AddPedido(userId, idDireccion);

            if (pedido == null) {
                BadRequest("No se ha podido agregar el pedido");
            }

            return Ok(pedido);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserPedidos(Guid userId) { 

            List<Pedido> pedidos = await _pedidoService.GetUsuarioPedidos(userId);
            
            return  Ok(pedidos);
        }

        [HttpDelete]
        public async Task<IActionResult> CancelPedido([FromForm]Guid idPedido)
        {
            bool response = await  _pedidoService.CancelPedido(idPedido);

            if (!response) {
                return BadRequest("No se ha podido cancelar el pedido");
            }

            return Ok("Pedido cancelado con exito");
        }
    }
}
