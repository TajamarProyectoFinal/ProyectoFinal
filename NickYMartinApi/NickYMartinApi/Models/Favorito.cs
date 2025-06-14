using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NickYMartinApi.Models
{
    public class Favorito
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey(nameof(Usuario))]
        public Guid UsuarioId { get; set; }
        public User Usuario { get; set; }
        [ForeignKey(nameof(Producto))]
        public Guid ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}
