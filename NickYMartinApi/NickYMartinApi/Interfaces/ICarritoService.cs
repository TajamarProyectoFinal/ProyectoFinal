using NickYMartinApi.Models;
namespace NickYMartinApi.Interfaces
{
    public interface ICarritoService
    {
        public Task<Carrito> GetUserCarrito(string userId);
        public Task<Carrito> CreateOrAddUserCarrito(string userId, ItemCarrito itemCarrito);
        public Task<bool> RemoveItemCarrito(string userId, Guid idItemCarrito);
        public Task<bool> DeleteUserCarrito(string userId);
        public Task<bool> ClearCarritoItems(string userId);
    }
}
