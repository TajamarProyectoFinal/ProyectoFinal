using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NickYMartinApi.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        public string? Name { get; set; }
        public string? Phone { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [ForeignKey(nameof(Role))]
        public Guid RoleId { get; set; }

        public virtual Role? Role { get; set; } 
        public virtual IEnumerable<Direccion> Direcciones { get; set; } = new List<Direccion>();

        public virtual IEnumerable<Favorito> Favoritos { get; set; }
        public virtual IEnumerable<Carrito> Carritos { get; set; }
        public virtual IEnumerable<Comentario> Comentarios { get; set; }
        public virtual IEnumerable<Valoracion> Valoraciones { get; set; }
    }
}
