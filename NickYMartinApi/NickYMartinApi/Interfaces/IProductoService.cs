using NickYMartinApi.Enums;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;

namespace NickYMartinApi.Interfaces
{
    public interface IProductoService
    {
        public Task<ProductosViewModel> GetProductos(
            SearchTypes searchType = SearchTypes.List,
            ProductosFilters? filters = null,
            int page = 1,
            int resultsPerPage = 5);
        public Task<Producto?> GetProducto(Guid idProducto);
        public Task<Producto> AddProducto(Producto producto, List<IFormFile> files, List<string> categoriasIds);
        public Task<bool> UpdateProducto(Guid idProducto, Producto producto, List<IFormFile> files, List<string> categoriasIds);
        public Task<bool> DeleteProducto(Guid idProducto);
    }
}
