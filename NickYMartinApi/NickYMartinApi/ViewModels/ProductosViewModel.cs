using NickYMartinApi.Enums;
using NickYMartinApi.Models;

namespace NickYMartinApi.ViewModels
{
    public class ProductosViewModel
    {
        public List<ProductoCategoriasViewModel>? Productos { get; set; }
        public ProductosFilters? Filters { get; set; }
        public SearchTypes SearchTypes { get; set; } = SearchTypes.List;
        public int CurrentPage { get; set; } = 1;
        public int ResultsPerPage { get; set; } = 5;
        public int TotalResults { get; set; }
    }
}
