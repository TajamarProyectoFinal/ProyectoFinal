using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.Models
{
    public class Role
    {
        [Key]
        public Guid RolId { get; set; }
        public string NombreRol { get; set; }
    }
}
