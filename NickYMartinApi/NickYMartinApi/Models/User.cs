using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = "User"; // User, Admin, etc.

        public virtual IEnumerable<Direccion> Direcciones { get; set; } = new List<Direccion>();

        public virtual IEnumerable<Favorito> Favoritos { get; set; }
        public virtual IEnumerable<Carrito> Carritos { get; set; }
        public virtual IEnumerable<Comentario> Comentarios { get; set; }
        public virtual IEnumerable<Valoracion> Valoraciones { get; set; }
    }
}
