using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface ICategoriaRepository
    {
        public Task<List<Categoria>> GetCategorias();
        public Task<Categoria> GetCategoria(Guid IdCategoria);
        public Task<List<Categoria>> GetCategoriasByProducto(Guid idProducto);
        public Task<Categoria> CreateCategoria(Categoria categoria);
        public Task<bool> UpdateCategoria(Guid IdCategoria, Categoria categoria);
        public Task<bool> AssignOrRemoveCategoriaProducto(Guid IdProducto, Guid IdCategoria, bool assign);
        public Task<bool> UpdateCategoriasProducto(Guid IdProducto, List<string> categoriaIds);
        public Task<bool> DeleteCategoria(Guid IdCategoria);
    }
}
