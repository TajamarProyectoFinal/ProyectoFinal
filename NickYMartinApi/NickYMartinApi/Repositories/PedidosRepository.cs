
using Microsoft.EntityFrameworkCore;
using NickYMartinApi.Data;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Repositories
{
    public class PedidosRepository : IPedidosRepository
    {
        private readonly ApplicationDbContext _context;

        public PedidosRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Pedido> AddPedido(Pedido pedido)
        {
            await _context.Pedidos.AddAsync(pedido);
            await _context.SaveChangesAsync();

            return pedido;
        }

        public async Task<bool> AddListDetallesPedido(List<DetallesPedidos> detallesPedido)
        {
            await _context.DetallesPedidos.AddRangeAsync(detallesPedido);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Pedido?> GetPedido(Guid IdPedido)
        {
            Pedido? pedido = await _context.Pedidos.Include(p => p.DetallesPedidos).ThenInclude(p => p.Producto).SingleOrDefaultAsync(p => p.IdPedido == IdPedido);

            return pedido;
        }

        public async Task<List<Pedido>> GetUsuarioPedidos(Guid userId)
        {
            List<Pedido> pedidos = await _context.Pedidos.Where(p => p.IdUsuario == userId).ToListAsync();

            return pedidos;
        }

        public async Task<bool> CancelPedido(Pedido pedido)
        {
            _context.Pedidos.Remove(pedido);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
