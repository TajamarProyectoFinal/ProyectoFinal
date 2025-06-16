using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
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
        public DbSet<Role> Roles { get; set; } 

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<Role> roles = new List<Role>() {
            new Role { RolId = Guid.Parse("a7b9c28d-456e-4f1a-b890-3c5d6e7f8a91"), NombreRol = IUserRoles.ADMIN },
            new Role { RolId = Guid.Parse("1c3f5e7a-8b9d-4e2c-9a3b-6f8d7c5e3a21"), NombreRol = IUserRoles.STAFF },
            new Role { RolId = Guid.Parse("e9a2b3c4-5d6f-4a8b-9c1d-2e4f6a8b7c93"), NombreRol = IUserRoles.CLIENTE }
            };

            builder.Entity<Role>().HasData(roles);

            List<User> users = new List<User>()
           {
                //Admin
                new User {
                        Id = Guid.Parse("b8d7e9f0-1a2b-4c3d-8e5f-7a9b1c3d5e7f"),
                        Name = "Paco Revilla",
                        Email ="admin@nickymartin.com",
                        RoleId = roles.SingleOrDefault(r => r.NombreRol == IUserRoles.ADMIN).RolId
                    },
                //Staff
                new User {
                        Id = Guid.Parse("f0e1d2c3-4b5a-8d6e-9c1f-2a3b4c5d6e7f"),
                        Name = "Marta Gonzalez",
                        Email = "lucia.sanchiz@nickymartin.com",
                        RoleId = roles.SingleOrDefault(r => r.NombreRol == IUserRoles.STAFF).RolId
                    },
                //Cliente
                new User {
                        Id = Guid.Parse("a9b8c7d6-2e3f-4a5b-8c9d-1e2f3a4b5c6d"),
                        Email = "laura.gomez@gmail.com",
                        Name = "Laura Gomez",
                        RoleId = roles.SingleOrDefault(r => r.NombreRol == IUserRoles.CLIENTE).RolId
                    }
            };

            var passwordHasher = new PasswordHasher<User>();
            users[0].PasswordHash = passwordHasher.HashPassword(users[0], "Admin1234!");
            users[1].PasswordHash = passwordHasher.HashPassword(users[1], "Lucia1234!");
            users[2].PasswordHash = passwordHasher.HashPassword(users[2], "Paco1234!");

            builder.Entity<User>().HasData(users);

            List<Producto> productos = new List<Producto>()
        {
            new Producto {
                IdProducto = Guid.Parse("c8d9e0f1-2a3b-4c5d-8e6f-9a0b1c2d3e4f"),
                Nombre = "Camiseta Básica Algodón",
                Descripcion = "Camiseta de manga corta, 100% algodón suave.",
                Precio = 19.99m,
                Stock = 100,
                FechaCreacion = DateTime.Parse("1966/11/24 7:34:51"),
                FechaActualizacion = DateTime.Parse("2023/4/18 10:25:40"),
            },
            new Producto {
                IdProducto = Guid.Parse("f2e3d4c5-6b7a-8d9e-0c1f-2a3b4c5d6e7f"),
                Nombre = "Pantalón Vaquero Recto",
                Descripcion = "Pantalón vaquero clásico de corte recto.",
                Precio = 49.99m,
                Stock = 50,
                FechaCreacion = DateTime.Parse("1973/1/10 18:56:12"),
                FechaActualizacion = DateTime.Parse("2020/7/3 14:01:55")
            },
            new Producto {
                IdProducto = Guid.Parse("a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d"),
                Nombre = "Zapatillas Deportivas Urbanas",
                Descripcion = "Zapatillas cómodas y con estilo para el día a día.",
                Precio = 79.99m,
                Stock = 75,
                FechaCreacion = DateTime.Parse("1900/01/01 00:00:00"),
                FechaActualizacion = DateTime.Parse("2024/01/05 20:15:30")
            },
            new Producto {
                IdProducto = Guid.Parse("d4c5b6a7-8f9e-0c1d-2a3b-4c5d6e7f8a9b"),
                Nombre = "Bolso de Cuero Grande",
                Descripcion = "Bolso de cuero genuino con múltiples compartimentos.",
                Precio = 129.99m,
                Stock = 20,
                FechaCreacion = DateTime.Parse("1989/07/15 03:40:20"),
                FechaActualizacion = DateTime.Parse("2025/06/14 18:32:49")
            },
            new Producto {
                IdProducto = Guid.Parse("e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b"),
                Nombre = "Gafas de Sol Polarizadas",
                Descripcion = "Gafas de sol con lentes polarizadas para una visión clara.",
                Precio = 59.99m,
                Stock = 60,
                FechaCreacion = DateTime.Parse("1945/05/08 11:00:00"),
                FechaActualizacion = DateTime.Parse("2022/11/09 08:50:05")
            },
            new Producto {
                IdProducto = Guid.Parse("b0a9c8d7-1f2e-3a4b-5c6d-7e8f9a0b1c2d"),
                Nombre = "Libro 'Aventuras Épicas'",
                Descripcion = "Una emocionante novela de fantasía y aventuras.",
                Precio = 12.50m,
                Stock = 150,
                FechaCreacion = DateTime.Parse("1998/12/31 23:59:59"),
                FechaActualizacion = DateTime.Parse("2021/02/20 17:07:10")
            },
            new Producto {
                IdProducto = Guid.Parse("d1c2b3a4-5f6e-7a8b-9c0d-1e2f3a4b5c6d"),
                Nombre = "Taza de Cerámica Decorada",
                Descripcion = "Taza de cerámica de alta calidad con diseño único.",
                Precio = 8.99m,
                Stock = 200,
                FechaCreacion = DateTime.Parse("1905/03/17 14:22:05"),
                FechaActualizacion = DateTime.Parse("2023/09/01 12:00:00")
            },
            new Producto {
                IdProducto = Guid.Parse("e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b"),
                Nombre = "Funda Protectora para Smartphone",
                Descripcion = "Funda resistente para proteger tu teléfono de golpes y arañazos.",
                Precio = 24.99m,
                Stock = 120,
                FechaCreacion = DateTime.Parse("1981/09/02 09:10:30"),
                FechaActualizacion = DateTime.Parse("2020/04/12 06:30:00")
            },
            new Producto {
                IdProducto = Guid.Parse("a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d"),
                Nombre = "Reloj de Pulsera Clásico",
                Descripcion = "Reloj elegante con correa de cuero y movimiento de cuarzo.",
                Precio = 99.99m,
                Stock = 30,
                FechaCreacion = DateTime.Parse("1920/02/29 16:00:00"),
                FechaActualizacion = DateTime.Parse("2024/08/25 21:45:22")
            },
            new Producto {
                IdProducto = Guid.Parse("f4e5d6c7-8b9a-0c1d-2e3f-4a5b6c7d8e9f"),
                Nombre = "Auriculares Inalámbricos Bluetooth",
                Descripcion = "Auriculares con conexión Bluetooth y sonido de alta fidelidad.",
                Precio = 69.99m,
                Stock = 80,
                FechaCreacion = DateTime.Parse("1950/06/01 10:00:00"),
                FechaActualizacion = DateTime.Parse("2021/10/30 13:00:00")
            }
        };

            builder.Entity<Producto>(entity =>
            {
                entity.Property(e => e.Precio).HasPrecision(18, 2);
                entity.HasData(productos);
            });

            List<Categoria> categorias = new List<Categoria>()
        {
            new Categoria { IdCategoria = Guid.Parse("1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d"), Nombre = "Ropa" },
            new Categoria { IdCategoria = Guid.Parse("b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), Nombre = "Calzado" },
            new Categoria { IdCategoria = Guid.Parse("c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f"), Nombre = "Accesorios" },
            new Categoria { IdCategoria = Guid.Parse("d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a"), Nombre = "Hogar" },
            new Categoria { IdCategoria = Guid.Parse("e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b"), Nombre = "Libros" },
            new Categoria { IdCategoria = Guid.Parse("f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c"), Nombre = "Tecnología" },
            new Categoria { IdCategoria = Guid.Parse("a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d"), Nombre = "Electrónica" },
            new Categoria { IdCategoria = Guid.Parse("b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e"), Nombre = "Deportes" },
            new Categoria { IdCategoria = Guid.Parse("c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f"), Nombre = "Belleza" },
            new Categoria { IdCategoria = Guid.Parse("d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a"), Nombre = "Joyería" }
        };

            builder.Entity<Categoria>().HasData(categorias);

            builder.Entity<ProductoCategoria>().HasData(
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("f9e8d7c6-5b4a-3f2e-1d0c-9b8a7f6e5d4c"),
                    IdProducto = productos.First(p => p.Nombre == "Camiseta Básica Algodón").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Ropa").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"),
                    IdProducto = productos.First(p => p.Nombre == "Pantalón Vaquero Recto").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Ropa").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("4e3d2c1b-a0f9-8e7d-6c5b-4a3f2e1d0c9b"),
                    IdProducto = productos.First(p => p.Nombre == "Zapatillas Deportivas Urbanas").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Calzado").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d"),
                    IdProducto = productos.First(p => p.Nombre == "Zapatillas Deportivas Urbanas").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Deportes").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("6d5e4f3a-2b1c-4d0e-8f7a-9b8c7d6e5f4a"),
                    IdProducto = productos.First(p => p.Nombre == "Bolso de Cuero Grande").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Accesorios").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"),
                    IdProducto = productos.First(p => p.Nombre == "Bolso de Cuero Grande").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Belleza").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("7c8b9a0f-1e2d-3c4b-5a6f-7e8d9c0b1a2f"),
                    IdProducto = productos.First(p => p.Nombre == "Gafas de Sol Polarizadas").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Accesorios").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("c0d1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5"),
                    IdProducto = productos.First(p => p.Nombre == "Libro 'Aventuras Épicas'").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Libros").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c"),
                    IdProducto = productos.First(p => p.Nombre == "Taza de Cerámica Decorada").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Hogar").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("9e0d1c2b-3a4f-5e6d-7c8b-9a0f1e2d3c4b"),
                    IdProducto = productos.First(p => p.Nombre == "Funda Protectora para Smartphone").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Tecnología").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"),
                    IdProducto = productos.First(p => p.Nombre == "Funda Protectora para Smartphone").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Electrónica").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6"),
                    IdProducto = productos.First(p => p.Nombre == "Reloj de Pulsera Clásico").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Accesorios").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a"),
                    IdProducto = productos.First(p => p.Nombre == "Reloj de Pulsera Clásico").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Joyería").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e"),
                    IdProducto = productos.First(p => p.Nombre == "Auriculares Inalámbricos Bluetooth").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Tecnología").IdCategoria
                },
                new ProductoCategoria
                {
                    IdProductoCategoria = Guid.Parse("c8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f"),
                    IdProducto = productos.First(p => p.Nombre == "Auriculares Inalámbricos Bluetooth").IdProducto,
                    IdCategoria = categorias.First(c => c.Nombre == "Electrónica").IdCategoria
                }
            );

            var clienteLauraId = users.Single(u => u.Email == "laura.gomez@gmail.com").Id;

            List<Direccion> direcciones = new List<Direccion>()
        {
            new Direccion
            {
                IdDireccion = Guid.Parse("2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"),
                IdUsuario = clienteLauraId,
                Domicilio = "Avenida Siempreviva 742",
                CodigoPostal = 28080,
                Ciudad = "Madrid",
                Provincia = "Madrid",
                Pais = "España",
                principal = true
            },
            new Direccion
            {
                IdDireccion = Guid.Parse("3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f"),
                IdUsuario = clienteLauraId,
                Domicilio = "Calle de la Piruleta 15",
                CodigoPostal = 08001,
                Ciudad = "Barcelona",
                Provincia = "Barcelona",
                Pais = "España",
                principal = false
            }
        };

            builder.Entity<Direccion>().HasData(direcciones);

            Guid direccionLaura = direcciones.Single(d => d.IdUsuario == clienteLauraId && d.principal == true).IdDireccion;

            List<Pedido> pedidos = new List<Pedido>()
        {
            new Pedido
            {
                IdPedido = Guid.Parse("2f3e4d5c-6b7a-8f9e-0d1c-2b3a4f5e6d7c"),
                Numero = 1,
                IdUsuario = clienteLauraId,
                IdDireccion = direccionLaura,
                FechaCreacion = DateTime.Now.AddDays(-1),
                Estado = IEstadosPedido.PENDIENTE,
                Total = 45.99m
            },
            new Pedido
            {
                IdPedido = Guid.Parse("d0c1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5"),
                Numero = 2,
                IdUsuario = clienteLauraId,
                IdDireccion = direccionLaura,
                FechaCreacion = DateTime.Now.AddDays(-5),
                Estado = IEstadosPedido.ENVIADO,
                Total = 89.50m
            }
        };

            builder.Entity<Pedido>(entity =>
            {
                entity.Property(e => e.Total).HasPrecision(18, 2);
                entity.HasData(pedidos);
            });

            var pedido1 = pedidos.First(p => p.Numero == 1 && p.IdUsuario == clienteLauraId);
            var pedido2 = pedidos.First(p => p.Numero == 2 && p.IdUsuario == clienteLauraId);

            var camiseta = productos.First(p => p.Nombre == "Camiseta Básica Algodón");
            var pantalon = productos.First(p => p.Nombre == "Pantalón Vaquero Recto");
            var libro = productos.First(p => p.Nombre == "Libro 'Aventuras Épicas'");
            var auriculares = productos.First(p => p.Nombre == "Auriculares Inalámbricos Bluetooth");

            List<DetallesPedidos> detallesPedidos = new List<DetallesPedidos>()
        {
            new DetallesPedidos
            {
                IdDetalle = Guid.Parse("4e3d2c1b-a0f9-8e7d-6c5b-4a3f2e1d0c9b"),
                IdPedido = pedido1.IdPedido,
                IdProducto = camiseta.IdProducto,
                Cantidad = 2,
                PrecioUnitario = camiseta.Precio,
                Subtotal = camiseta.Precio * 2
            },
            new DetallesPedidos
            {
                IdDetalle = Guid.Parse("8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d"),
                IdPedido = pedido1.IdPedido,
                IdProducto = libro.IdProducto,
                Cantidad = 1,
                PrecioUnitario = libro.Precio,
                Subtotal = libro.Precio
            },
            new DetallesPedidos
            {
                IdDetalle = Guid.Parse("f6e5d4c3-b2a1-0e9d-8c7b-6a5f4e3d2c1b"),
                IdPedido = pedido2.IdPedido,
                IdProducto = pantalon.IdProducto,
                Cantidad = 1,
                PrecioUnitario = pantalon.Precio,
                Subtotal = pantalon.Precio
            },
            new DetallesPedidos
            {
                IdDetalle = Guid.Parse("a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"),
                IdPedido = pedido2.IdPedido,
                IdProducto = auriculares.IdProducto,
                Cantidad = 1,
                PrecioUnitario = auriculares.Precio,
                Subtotal = auriculares.Precio
            }
        };

            builder.Entity<DetallesPedidos>(entity =>
            {
                entity.Property(e => e.Subtotal).HasPrecision(18, 2);
                entity.Property(e => e.PrecioUnitario).HasPrecision(18, 2);
                entity.HasData(detallesPedidos);
            });

            builder.Entity<Carrito>(entity =>
            {
                entity.Property(e => e.Total).HasPrecision(18, 2);
            });

            builder.Entity<ItemCarrito>(entity =>
            {
                entity.Property(e => e.PrecioUnitario).HasPrecision(18, 2);
                entity.Property(e => e.Subtotal).HasPrecision(18, 2);
            });
        }
    }
}