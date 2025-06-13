using NickYMartinApi.Models;
using NickYMartinApi.Enums;

namespace EcommerceBasicoAWS.ViewModels
{
    public class CategoriaViewModel
    {
        public Categoria? Categoria { get; set; }
        public ActionTypes Action { get; set; } = ActionTypes.Create;
    }
}
