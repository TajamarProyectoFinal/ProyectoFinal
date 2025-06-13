using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface ICarritoRepository
    {
        public Task<Carrito?> GetUserCarrito(string userId);
        public Task<Carrito> CreateCarrito(Carrito carrito);
        public Task<ItemCarrito?> GetItemCarrito(string userId, Guid idItemCarrito);
        public Task<bool> RemoveItemCarrito(string userId, Guid idItemCarrito);
        public Task<bool> AddItemCarrito(Carrito carrito, ItemCarrito itemCarrito);
        public Task<bool> DeleteUserCarrito(string userId);
        public Task<bool> ClearCarritoItems(string userId);
    }
}
