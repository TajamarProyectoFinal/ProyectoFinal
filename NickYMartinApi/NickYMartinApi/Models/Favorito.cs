using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NickYMartinApi.Models
{
    public class Favorito
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey(nameof(Usuario))]
        public int UsuarioId { get; set; }
        public User Usuario { get; set; }
        [ForeignKey(nameof(Producto))]
        public int ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}
