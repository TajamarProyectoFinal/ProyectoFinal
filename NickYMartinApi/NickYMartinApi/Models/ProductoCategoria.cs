using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Models
{
    public class ProductoCategoria
    {

        [Key]
        public Guid IdProductoCategoria { get; set; }
        [ForeignKey(nameof(Producto))]
        public Guid IdProducto { get; set; }
        public virtual Producto? Producto { get; set; }
        [ForeignKey(nameof(Categoria))]
        public Guid IdCategoria { get; set; }
        public virtual Categoria? Categoria { get; set; }
    }
}
