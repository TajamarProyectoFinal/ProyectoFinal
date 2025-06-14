using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NickYMartinApi.Models
{
    public class Valoracion
    {
        [Key]
        public Guid Id { get; set; }
        public int Puntuacion { get; set; } // de 1 a 5
        public string? Comentario { get; set; }

        [ForeignKey(nameof(Usuario))]
        public Guid UsuarioId { get; set; }
        public User Usuario { get; set; }

        [ForeignKey(nameof(Producto))]
        public Guid ProductoId { get; set; }
        public Producto Producto { get; set; }
    }

}
