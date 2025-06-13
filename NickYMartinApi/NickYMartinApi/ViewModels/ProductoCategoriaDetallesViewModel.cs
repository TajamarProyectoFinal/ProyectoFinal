using NickYMartinApi.Models;

namespace EcommerceBasicoAWS.ViewModels
{
    public class ProductoCategoriasDetallesViewModel
    {
        public Producto? Producto { get; set; }
        public List<MultimediaProducto>? Multimedia { get; set; }
        public List<Categoria>? Categorias { get; set; }
    }
}
