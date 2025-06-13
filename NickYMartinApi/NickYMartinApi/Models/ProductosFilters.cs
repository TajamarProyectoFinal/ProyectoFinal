namespace NickYMartinApi.Models
{
    public class ProductosFilters
    {
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public decimal? Precio { get; set; } = null;
        public int? Stock { get; set; } = null;
        public DateTime? FechaCreacion { get; set; } = null;
        public DateTime? FechaActualizacion { get; set; } = null;
    }
}
