using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Services
{
    public class CarritoService : ICarritoService
    {
        private readonly ICarritoRepository _carritoRepository;

        public CarritoService(ICarritoRepository carritoRepository)
        {
            _carritoRepository = carritoRepository;
        }

        public async Task<Carrito> CreateOrAddUserCarrito(string userId, ItemCarrito itemCarrito)
        {
            Carrito? carrito = await GetUserCarrito(userId);

            itemCarrito.IdItemCarrito = new Guid();

            if (carrito == null) {
                Carrito carritoToAdd = new Carrito()
                {
                    IdUsuario = userId,
                    FechaCreacion = DateTime.Now,                    
                    Total = 0,
                };

               carrito = await _carritoRepository.CreateCarrito(carritoToAdd);
            }

            itemCarrito.IdCarrito = carrito.IdCarrito;
            await _carritoRepository.AddItemCarrito(carrito, itemCarrito);

            return carrito;
        }

        public async Task<Carrito?> GetUserCarrito(string userId)
        {
            Carrito? carrito = await _carritoRepository.GetUserCarrito(userId);            

            return carrito;
        }

        public async Task<bool> RemoveItemCarrito(string userId, Guid idItemCarrito)
        {
            bool response = await _carritoRepository.RemoveItemCarrito(userId, idItemCarrito);

            return response;
        }

        public async Task<bool> DeleteUserCarrito(string userId)
        {
            bool response = await _carritoRepository.DeleteUserCarrito(userId);

            return response;
        }

        public async Task<bool> ClearCarritoItems(string userId)
        {
            bool response = await _carritoRepository.ClearCarritoItems(userId);

            return response;
        }
    }
}
