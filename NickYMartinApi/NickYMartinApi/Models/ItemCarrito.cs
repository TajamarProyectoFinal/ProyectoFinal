using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Models
{
    public class ItemCarrito
    {
        [Key]
        public Guid IdItemCarrito { get; set; }
        [ForeignKey(nameof(Carrito))]
        public Guid IdCarrito { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public virtual Carrito? Carrito { get; set; }
        [ForeignKey(nameof(Producto))]
        public Guid IdProducto { get; set; }
        public virtual Producto? Producto { get; set; }
        public string? MainImageUrl { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
