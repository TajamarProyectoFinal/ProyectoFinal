using System.ComponentModel.DataAnnotations;

namespace NickYMartinApi.ViewModels
{
    public class UserViewmodel
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string? Password { get; set; }
    }
}
