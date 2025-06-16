using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Models
{
    public class Carrito
    {
        [Key]
        public Guid IdCarrito { get; set; }
        [ForeignKey(nameof(Usuario))]
        public Guid? IdUsuario { get; set; }
        public virtual User? Usuario { get; set; }
        public string? userMail { get; set; }
        public DateTime FechaCreacion { get; set; }
        public virtual ICollection<ItemCarrito>? ItemsCarrito { get; set; }
        public decimal Total { get; set; }
    }
}
