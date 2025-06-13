using NickYMartinApi.Enums;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;

namespace NickYMartinApi.Interfaces
{
    public interface IProductosRepository
    {
        public Task<ProductosViewModel> GetProductos(
            SearchTypes searchType = SearchTypes.List,
            ProductosFilters? filters = null,
            int page = 1,
            int resultsPerPage = 5);
        public Task<List<MultimediaProducto>> GetProductoMultimedia(Guid idProducto);
        public Task<MultimediaProducto> GetProductoMainImage(Guid idProducto);
        public Task<Producto?> GetProducto(Guid id);
        public Task<bool> AddMultimediasProducto(Guid idProducto, List<IFormFile> files);
        public Task<Producto?> AddProducto(Producto producto);
        public bool UpdateProducto(Producto producto);
        public Task<bool> DeleteProducto(Guid id);
    }
}
