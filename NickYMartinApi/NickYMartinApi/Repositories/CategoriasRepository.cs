
using Microsoft.EntityFrameworkCore;
using NickYMartinApi.Data;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Repositories
{
    public class CategoriasRepository : ICategoriaRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoriasRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AssignOrRemoveCategoriaProducto(Guid IdProducto, Guid IdCategoria, bool assign)
        {
            Categoria? categoria = await _context.Categorias.SingleOrDefaultAsync(c => c.IdCategoria == IdCategoria);
            if (categoria == null) 
            {
                return false;
            } 
            Producto? producto = await _context.Productos.SingleOrDefaultAsync(p => p.IdProducto == IdProducto);

            if(producto == null)
            {
                return false;
            }

            bool status = false;
            try
            {
                if (assign) {
                    ProductoCategoria productoCategoria = new ProductoCategoria
                    {
                        IdProducto = IdProducto,
                        IdCategoria = IdCategoria,
                    };
                    _context.ProductosCategorias.Add(productoCategoria);
                }
                else
                {
                    ProductoCategoria? productoCategoria = _context.ProductosCategorias.SingleOrDefault(pc => pc.IdProducto == IdProducto && pc.IdCategoria == IdCategoria);
                    if(productoCategoria != null)
                    {
                        _context.ProductosCategorias.Remove(productoCategoria);
                    }
                }

                _context.SaveChanges();

                status = true;
            }
            catch (Exception ex) {
                status = false;
            }

            return status;
        }

        public async Task<Categoria> CreateCategoria(Categoria categoria)
        {
            await _context.Categorias.AddAsync(categoria);
            _context.SaveChanges();

            return categoria;
        }

        public async Task<bool> DeleteCategoria(Guid IdCategoria)
        {
            bool deletionSuccess = false;
            Categoria categoria = await GetCategoria(IdCategoria);

            if (categoria != null) {
                _context.Categorias.Remove(categoria);
                _context.SaveChanges();
                deletionSuccess = true;
            } 

            return deletionSuccess;
        }

        public async Task<Categoria?> GetCategoria(Guid IdCategoria)
        {
            Categoria? categoria = await _context.Categorias.SingleOrDefaultAsync(c => c.IdCategoria == IdCategoria);

            return categoria;
        }

        public async Task<List<Categoria>> GetCategorias()
        {
            List<Categoria> categorias = await _context.Categorias.ToListAsync();

            return categorias;
        }

        public async Task<List<Categoria>> GetCategoriasByProducto(Guid idProducto)
        {
            List<Categoria> categorias = await _context.ProductosCategorias
                .Where(pc => pc.IdProducto == idProducto).Select( c => new Categoria
                {
                    IdCategoria = c.Categoria.IdCategoria,
                    Nombre = c.Categoria.Nombre                    
                }).ToListAsync();

            return categorias;
        }

        public async Task<bool> UpdateCategoria(Guid IdCategoria, Categoria categoria)
        {
            if (IdCategoria != categoria.IdCategoria) { 
                return false;
            }
            bool updateStatus = false;

            Categoria categoriaActualizar = await GetCategoria(IdCategoria);

            if (categoriaActualizar != null) {
                categoriaActualizar.Nombre = categoria.Nombre;

                _context.SaveChanges();
                updateStatus = true;
            }

            return updateStatus;
        }

        public async Task<bool> UpdateCategoriasProducto(Guid IdProducto, List<string> categoriaIds)
        {

            foreach (string categoriaId in categoriaIds) 
            {
                Guid categoriaIdGuid = new Guid(categoriaId);
                ProductoCategoria? productoCategoria = await _context.ProductosCategorias.FirstOrDefaultAsync(c => c.IdProducto == IdProducto && c.IdCategoria == categoriaIdGuid);
                if(productoCategoria == null)
                {
                    await AssignOrRemoveCategoriaProducto(IdProducto, categoriaIdGuid, true);
                }
            }

            List<Categoria> categoriasProducto = await GetCategoriasByProducto(IdProducto);

            foreach(Categoria categoria in categoriasProducto)
            {
                string? categoriaIdString = categoriaIds.FirstOrDefault(c => c == categoria.IdCategoria.ToString());                
                if(categoriaIdString == null)
                {
                    await AssignOrRemoveCategoriaProducto(IdProducto, categoria.IdCategoria, false);
                }
            }

            return true;
        }
    }
}
