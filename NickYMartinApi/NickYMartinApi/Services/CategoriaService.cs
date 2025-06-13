using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriaService(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        public async Task<Categoria> AddCategoria(Categoria categoria)
        {
            Categoria categoriaCreada = await _categoriaRepository.CreateCategoria(categoria);

            return categoriaCreada;
        }

        public void AddCategoriasProducto(Guid IdProducto, List<Categoria> categorias)
        {
            foreach (Categoria categoria in categorias) {
                _categoriaRepository.AssignOrRemoveCategoriaProducto(IdProducto, categoria.IdCategoria, true);
            }
        }

        public async Task<bool> AssignCategoriaProducto(Guid IdProducto, Categoria categoria)
        {
           bool response = await _categoriaRepository.AssignOrRemoveCategoriaProducto(IdProducto, categoria.IdCategoria, true);

            return response;
        }

        public async Task<Categoria?> GetCategoria(Guid idCategoria)
        {
            return await _categoriaRepository.GetCategoria(idCategoria);
        }

        public async Task<List<Categoria>> GetCategorias()
        {
           return await _categoriaRepository.GetCategorias();
        }

        public async Task<List<Categoria>> GetProductoCategorias(Guid IdProducto)
        {
            return await _categoriaRepository.GetCategoriasByProducto(IdProducto);
        }

        public async Task<bool> RemoveCategoria(Guid IdCategoria)
        {
            bool response = await _categoriaRepository.DeleteCategoria(IdCategoria);

            return response;
        }

        public async Task<bool> RemoveCategoriaProducto(Guid IdProducto, Categoria categoria)
        {
            bool response = await _categoriaRepository.AssignOrRemoveCategoriaProducto(IdProducto, categoria.IdCategoria, false);

            return response;
        }

        public async Task<bool> UpdateCategoria(Guid IdCategoria, Categoria categoria)
        {
            bool response = await _categoriaRepository.UpdateCategoria(IdCategoria, categoria);

            return response;
        }
    }
}
