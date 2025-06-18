using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface IPedidosRepository
    {
        public Task<Pedido> AddPedido(Pedido pedido);
        public Task<Pedido?> GetPedido(Guid IdPedido);
        public Task<List<Pedido>> GetUsuarioPedidos(Guid userId);
        public Task<bool> AddListDetallesPedido(List<DetallesPedidos> detallesPedido);
        public Task<bool> CancelPedido(Pedido IdPedido);
    }
}
