using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface IPedidoService
    {
        public Task<bool> AddPedido(Guid userId, Guid IdDireccion);
        public Task<Pedido?> GetPedido(Guid IdPedido);
        public Task<List<Pedido>> GetUsuarioPedidos(Guid userId);
        public Task<bool> CancelPedido(Guid IdPedido);
    }
}
