using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NickYMartinApi.Models
{
    public class Comentario
    {
        [Key]
        public int Id { get; set; }
        public string Texto { get; set; }
        public DateTime Fecha { get; set; }

        [ForeignKey(nameof(Usuario))]
        public int UsuarioId { get; set; }
        public virtual User Usuario { get; set; }

        [ForeignKey(nameof(Producto))]
        public int ProductoId { get; set; }
        public virtual Producto Producto { get; set; }

        [ForeignKey(nameof(ComentarioPadre))]
        public int? ComentarioPadreId { get; set; }
        public Comentario? ComentarioPadre { get; set; }

        public virtual IEnumerable<Comentario> Respuestas { get; set; }
    }
}
