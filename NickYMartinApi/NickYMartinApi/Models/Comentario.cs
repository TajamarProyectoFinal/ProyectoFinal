using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NickYMartinApi.Models
{
    public class Comentario
    {
        [Key]
        public Guid Id { get; set; }
        public string Texto { get; set; }
        public DateTime Fecha { get; set; }

        [ForeignKey(nameof(Usuario))]
        public Guid UsuarioId { get; set; }
        public virtual User Usuario { get; set; }

        [ForeignKey(nameof(Producto))]
        public Guid ProductoId { get; set; }
        public virtual Producto Producto { get; set; }

        [ForeignKey(nameof(ComentarioPadre))]
        public Guid? ComentarioPadreId { get; set; }
        public Comentario? ComentarioPadre { get; set; }

        public virtual IEnumerable<Comentario> Respuestas { get; set; }
    }
}
