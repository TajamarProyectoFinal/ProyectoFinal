using Microsoft.EntityFrameworkCore;
using NickYMartinApi.Data;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Repositories
{
    public class DireccionesRepository : IDireccionesRepository
    {
        private readonly ApplicationDbContext _context;
        public DireccionesRepository(ApplicationDbContext contex)
        {
            _context = contex;
        }

        public async Task<Direccion> AddDireccion(Direccion direccion)
        {
            await _context.Direcciones.AddAsync(direccion);
            _context.SaveChangesAsync();

            return direccion;
        }

        public async Task<bool> AddUserListDirecciones(List<Direccion> direcciones)
        {
            await _context.Direcciones.AddRangeAsync(direcciones);
            _context.SaveChangesAsync();

            return true;
        }

        public async Task<Direccion?> GetDireccion(Guid idDireccion)
        {
            Direccion direccion = await _context.Direcciones.SingleOrDefaultAsync(d => d.IdDireccion == idDireccion);

            return direccion;
        }

        public async Task<List<Direccion>> GetUserDirecciones(Guid userId)
        {
            List<Direccion> direcciones = await _context.Direcciones.Where(d => d.IdUsuario == userId).ToListAsync();

            return direcciones;
        }

        public async Task<bool> RemoveDireccion(Direccion direccion)
        {
             _context.Direcciones.Remove(direccion);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Direccion> UpdateDireccion(Direccion direccion)
        {
            _context.Direcciones.Update(direccion);
            await _context.SaveChangesAsync();

            return direccion;
        }
    }
}
