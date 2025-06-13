using Microsoft.EntityFrameworkCore;
using NickYMartinApi.Models;

namespace NickYMartinApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options) {}
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<MultimediaProducto> MultimediaProductos { get; set; }
        public DbSet<ProductoCategoria> ProductosCategorias { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<DetallesPedidos> DetallesPedidos { get; set; }
        public DbSet<Direccion> Direcciones { get; set; }
        public DbSet<Carrito> Carritos { get; set; }
        public DbSet<ItemCarrito> ItemsCarrito { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Valoracion> Valoraciones { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}