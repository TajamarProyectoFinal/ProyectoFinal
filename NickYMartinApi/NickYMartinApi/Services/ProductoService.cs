using NickYMartinApi.Enums;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;

namespace NickYMartinApi.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductosRepository _productoRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public ProductoService(IProductosRepository productoRepository, ICategoriaRepository categoriaRepository)
        {
            _productoRepository = productoRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<Producto> AddProducto(Producto producto, List<IFormFile> files, List<string> categoriasIds)
        {
            Producto? productoCreado = await _productoRepository.AddProducto(producto);

            bool areFilesUpload = false;
            if (productoCreado != null) {
                if (files != null && files.Count() > 0)
                {
                    areFilesUpload = await _productoRepository.AddMultimediasProducto(productoCreado.IdProducto, files);
                }
            }

            if(categoriasIds != null)
            {
                foreach (string categoriaId in categoriasIds)
                {
                    await _categoriaRepository.AssignOrRemoveCategoriaProducto(productoCreado.IdProducto, new Guid(categoriaId), true);
                }
            }

            return productoCreado;
        }

        public async Task<bool> DeleteProducto(Guid idProducto)
        {
            List<Categoria> categorias = await _categoriaRepository.GetCategoriasByProducto(idProducto);
            if(categorias != null && categorias.Count() > 0)
            {
                foreach (Categoria categoria in categorias)
                {
                    await _categoriaRepository.AssignOrRemoveCategoriaProducto(idProducto, categoria.IdCategoria, false);
                }
            }

            bool response = await _productoRepository.DeleteProducto(idProducto);

            return response;
        }

        public async Task<Producto?> GetProducto(Guid id)
        {
            Producto? producto = await _productoRepository.GetProducto(id);

            return producto;
        }

        public async Task<ProductosViewModel> GetProductos(
            SearchTypes searchType = SearchTypes.List,
            ProductosFilters? filters = null,
            int page = 1,
            int resultsPerPage = 5)
        {
            ProductosViewModel productosVm = await _productoRepository.GetProductos(searchType, filters, page, resultsPerPage);

            return productosVm;
        }

        public async Task<bool> UpdateProducto(Guid idProducto, Producto producto, List<IFormFile> files, List<string> categoriaIds)
        {

            if (producto.IdProducto != idProducto) {
                return false;
            }

            bool response = false;

            Producto? productoEncontrado = await _productoRepository.GetProducto(idProducto);

            if (productoEncontrado != null && producto.IdProducto == productoEncontrado.IdProducto) {
                productoEncontrado.Nombre = producto.Nombre;
                productoEncontrado.Precio = producto.Precio;
                productoEncontrado.Descripcion = producto.Descripcion;
                productoEncontrado.FechaActualizacion = DateTime.Now;
                productoEncontrado.Stock = producto.Stock;

                response = _productoRepository.UpdateProducto(productoEncontrado);
                if(files != null && files.Count() > 0)
                {
                    bool areFilesUpload = await _productoRepository.AddMultimediasProducto(productoEncontrado.IdProducto, files);
                }
                bool updatedCategories = await _categoriaRepository.UpdateCategoriasProducto(productoEncontrado.IdProducto, categoriaIds);
            }

            return response;
        }
    }
}
