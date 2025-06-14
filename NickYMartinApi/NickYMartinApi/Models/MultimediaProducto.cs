using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Models
{
    public class MultimediaProducto
    {
        [Key]
        public Guid IdMultimedia { get; set; }
        [ForeignKey(nameof(Producto))]
        public Guid IdProducto { get; set; }
        public virtual Producto? Producto { get; set; }
        public string? Tipo { get; set; }
        public string? Url { get; set; }
        public string? NombreArchivo { get; set; }
        public string? Descripcion { get; set; }
        public int Orden { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
