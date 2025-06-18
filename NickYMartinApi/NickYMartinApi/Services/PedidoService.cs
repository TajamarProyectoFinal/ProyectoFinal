using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly ICarritoRepository _carritoRepository;
        private readonly IPedidosRepository _pedidoRepository;

        public PedidoService(ICarritoRepository carritoRepository, IPedidosRepository pedidoRepository)
        {
            _carritoRepository = carritoRepository;
            _pedidoRepository = pedidoRepository;
        }

        public async Task<bool> AddPedido(Guid userId, Guid direccionId)
        {
            Carrito? carrito = await _carritoRepository.GetUserCarrito(userId);

            if(carrito != null)
            {
                Pedido pedido = new Pedido()
                {
                    IdUsuario = userId,
                    IdDireccion = direccionId,
                    FechaCreacion = DateTime.Now, 
                    Total = carrito.Total,
                };

                Pedido pedidoCreado = await _pedidoRepository.AddPedido(pedido);

                List<DetallesPedidos> listDetallesPedidos = new List<DetallesPedidos>();

                foreach(ItemCarrito itemCarrito in carrito.ItemsCarrito)
                {
                    DetallesPedidos detallesPedido = new DetallesPedidos()
                    {                        
                        IdPedido = pedidoCreado.IdPedido,
                        IdProducto = itemCarrito.IdProducto,
                        Cantidad = itemCarrito.Cantidad,
                        Subtotal = itemCarrito.Subtotal,
                        PrecioUnitario = itemCarrito.PrecioUnitario,
                    };

                    listDetallesPedidos.Add(detallesPedido);
                }

                await _pedidoRepository.AddListDetallesPedido(listDetallesPedidos);

                //Eliminamos items del carrito
                await _carritoRepository.ClearCarritoItems(userId);

                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task<bool> CancelPedido(Guid IdPedido)
        {
            Pedido pedido =  await _pedidoRepository.GetPedido(IdPedido);

            if(pedido != null)
            {
               bool response = await _pedidoRepository.CancelPedido(pedido);

                return response;
            }

            return false;
        }

        public async Task<Pedido?> GetPedido(Guid IdPedido)
        {
            Pedido? pedido = await _pedidoRepository.GetPedido(IdPedido);

            return pedido;
        }

        public async Task<List<Pedido>> GetUsuarioPedidos(Guid userId)
        {
            List<Pedido> pedidos = await _pedidoRepository.GetUsuarioPedidos(userId);

            return pedidos;
        }
    }
}
