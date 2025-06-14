using NickYMartinApi.Models;
namespace NickYMartinApi.Interfaces
{
    public interface ICarritoService
    {
        public Task<Carrito> GetUserCarrito(Guid userId);
        public Task<Carrito> CreateOrAddUserCarrito(Guid userId, ItemCarrito itemCarrito);
        public Task<bool> RemoveItemCarrito(Guid userId, Guid idItemCarrito);
        public Task<bool> DeleteUserCarrito(Guid userId);
        public Task<bool> ClearCarritoItems(Guid userId);
    }
}
