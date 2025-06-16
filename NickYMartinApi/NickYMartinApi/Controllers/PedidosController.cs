using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> PedidoDetalles(Guid idPedido)
        {
            return Ok("mostrando detalles pedido");
        }

        [HttpPost]
        public async Task<IActionResult> AddPedido()
        {
            return Ok("pedido añadido correctamente");
        }

        [HttpDelete]
        public async Task<IActionResult> CancelPedido()
        {
            return Ok("Pedido cancelado con exito");
        }
    }
}
