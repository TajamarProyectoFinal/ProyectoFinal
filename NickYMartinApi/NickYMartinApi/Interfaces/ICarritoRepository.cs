using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface ICarritoRepository
    {
        public Task<Carrito?> GetUserCarrito(Guid userId);
        public Task<Carrito> CreateCarrito(Carrito carrito);
        public Task<ItemCarrito?> GetItemCarrito(Guid userId, Guid idItemCarrito);
        public Task<bool> RemoveItemCarrito(Guid userId, Guid idItemCarrito);
        public Task<bool> AddItemCarrito(Carrito carrito, ItemCarrito itemCarrito);
        public Task<bool> DeleteUserCarrito(Guid userId);
        public Task<bool> ClearCarritoItems(Guid userId);
    }
}
