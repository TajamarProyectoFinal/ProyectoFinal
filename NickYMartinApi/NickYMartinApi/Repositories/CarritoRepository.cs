using Microsoft.EntityFrameworkCore;
using NickYMartinApi.Data;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Repositories
{
    public class CarritoRepository : ICarritoRepository
    {

        private readonly ApplicationDbContext _context;

        public CarritoRepository(ApplicationDbContext context)
        {
           _context = context;
        }

        public async Task<bool> AddItemCarrito(Carrito carrito, ItemCarrito itemCarrito)
        {
            try
            {
                if (carrito.ItemsCarrito == null) { 
                    carrito.ItemsCarrito = new List<ItemCarrito>();
                }
                carrito.ItemsCarrito.Add(itemCarrito);
                carrito.Total += itemCarrito.Subtotal;
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }

        public async Task<bool> ClearCarritoItems(Guid userId)
        {
            bool response = false;
            Carrito? carrito = await GetUserCarrito(userId);
            if (carrito != null) {
                _context.ItemsCarrito.RemoveRange(carrito.ItemsCarrito);
                _context.SaveChanges();
            }

            return response;
        }

        public async Task<Carrito> CreateCarrito(Carrito carrito)
        {
            await _context.Carritos.AddAsync(carrito);
            _context.SaveChanges();

            return carrito;
        }

        public async Task<bool> DeleteUserCarrito(Guid userId)
        {
            Carrito? carrito = await GetUserCarrito(userId);
            bool response = false;
            if (carrito != null) {
                _context.Carritos.Remove(carrito);
                _context.SaveChanges();
                response = true;
            }

            return response;
        }

        public async Task<ItemCarrito?> GetItemCarrito(Guid userId, Guid idItemCarrito)
        {
            Carrito? carrito = await GetUserCarrito(userId);
            ItemCarrito? itemcarrito = null;
            if(carrito != null)
            {
                itemcarrito = carrito.ItemsCarrito.SingleOrDefault(i => i.IdItemCarrito == idItemCarrito);
            }

            return itemcarrito;
        }

        public async Task<Carrito?> GetUserCarrito(Guid userId)
        {
            Carrito? carrito = await _context.Carritos.Include(c => c.ItemsCarrito).ThenInclude(c => c.Producto).FirstOrDefaultAsync(c => c.IdUsuario == userId);

            return carrito;
        }

        public async Task<bool> RemoveItemCarrito(Guid userId, Guid idItemCarrito)
        {
            Carrito? carrito = await GetUserCarrito(userId);
            bool response = false;
            if(carrito != null)
            {
                ItemCarrito? itemCarrito = carrito.ItemsCarrito.SingleOrDefault(i => i.IdItemCarrito == idItemCarrito);

                if (itemCarrito != null) {
                    carrito.ItemsCarrito.Remove(itemCarrito);
                    carrito.Total -= itemCarrito.Subtotal;
                    _context.SaveChanges();
                    response = true;
                }
            }

            return response;
        }
    }
}
