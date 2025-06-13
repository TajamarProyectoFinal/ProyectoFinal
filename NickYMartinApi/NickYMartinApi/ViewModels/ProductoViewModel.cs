using NickYMartinApi.Enums;
using NickYMartinApi.Models;

namespace NickYMartinApi.ViewModels
{
    public class ProductoViewModel
    {
        public Producto? Producto { get; set; }
        //Listado de id de categorias para el select
        public List<string>? CategoriasIds { get; set; }
        public List<Categoria>? Categorias { get; set; }
        public List<MultimediaProducto>? MultimediasProducto { get; set; }
        public List<IFormFile>? Files { get; set; }
        public ActionTypes Action { get; set; } = ActionTypes.Create;
    }
}
