using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NickYMartinApi.Migrations
{
    /// <inheritdoc />
    public partial class inicio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    IdCategoria = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.IdCategoria);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    IdProducto = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MainImagenUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MainTrailerUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Precio = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaActualizacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.IdProducto);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NombreRol = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RolId);
                });

            migrationBuilder.CreateTable(
                name: "MultimediaProductos",
                columns: table => new
                {
                    IdMultimedia = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProducto = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NombreArchivo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Orden = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MultimediaProductos", x => x.IdMultimedia);
                    table.ForeignKey(
                        name: "FK_MultimediaProductos_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductosCategorias",
                columns: table => new
                {
                    IdProductoCategoria = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProducto = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdCategoria = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductosCategorias", x => x.IdProductoCategoria);
                    table.ForeignKey(
                        name: "FK_ProductosCategorias_Categorias_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "Categorias",
                        principalColumn: "IdCategoria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductosCategorias_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carritos",
                columns: table => new
                {
                    IdCarrito = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdUsuario = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carritos", x => x.IdCarrito);
                    table.ForeignKey(
                        name: "FK_Carritos_Users_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Comentarios",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Texto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsuarioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ComentarioPadreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comentarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comentarios_Comentarios_ComentarioPadreId",
                        column: x => x.ComentarioPadreId,
                        principalTable: "Comentarios",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Comentarios_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comentarios_Users_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Direcciones",
                columns: table => new
                {
                    IdDireccion = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdUsuario = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Domicilio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CodigoPostal = table.Column<int>(type: "int", nullable: false),
                    Ciudad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Provincia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pais = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    principal = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Direcciones", x => x.IdDireccion);
                    table.ForeignKey(
                        name: "FK_Direcciones_Users_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Favoritos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsuarioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favoritos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favoritos_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favoritos_Users_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Valoraciones",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Puntuacion = table.Column<int>(type: "int", nullable: false),
                    Comentario = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UsuarioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Valoraciones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Valoraciones_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Valoraciones_Users_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemsCarrito",
                columns: table => new
                {
                    IdItemCarrito = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdCarrito = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProducto = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MainImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioUnitario = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsCarrito", x => x.IdItemCarrito);
                    table.ForeignKey(
                        name: "FK_ItemsCarrito_Carritos_IdCarrito",
                        column: x => x.IdCarrito,
                        principalTable: "Carritos",
                        principalColumn: "IdCarrito",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemsCarrito_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    IdPedido = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Numero = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdUsuario = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IdDireccion = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Total = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.IdPedido);
                    table.ForeignKey(
                        name: "FK_Pedidos_Direcciones_IdDireccion",
                        column: x => x.IdDireccion,
                        principalTable: "Direcciones",
                        principalColumn: "IdDireccion",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pedidos_Users_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DetallesPedidos",
                columns: table => new
                {
                    IdDetalle = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdPedido = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProducto = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioUnitario = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesPedidos", x => x.IdDetalle);
                    table.ForeignKey(
                        name: "FK_DetallesPedidos_Pedidos_IdPedido",
                        column: x => x.IdPedido,
                        principalTable: "Pedidos",
                        principalColumn: "IdPedido",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetallesPedidos_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "IdCategoria", "Nombre" },
                values: new object[,]
                {
                    { new Guid("1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d"), "Ropa" },
                    { new Guid("a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d"), "Electrónica" },
                    { new Guid("b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), "Calzado" },
                    { new Guid("b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e"), "Deportes" },
                    { new Guid("c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f"), "Accesorios" },
                    { new Guid("c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f"), "Belleza" },
                    { new Guid("d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a"), "Joyería" },
                    { new Guid("d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a"), "Hogar" },
                    { new Guid("e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b"), "Libros" },
                    { new Guid("f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c"), "Tecnología" }
                });

            migrationBuilder.InsertData(
                table: "Productos",
                columns: new[] { "IdProducto", "Descripcion", "FechaActualizacion", "FechaCreacion", "MainImagenUrl", "MainTrailerUrl", "Nombre", "Precio", "Stock" },
                values: new object[,]
                {
                    { new Guid("a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d"), "Zapatillas cómodas y con estilo para el día a día.", new DateTime(2024, 1, 5, 20, 15, 30, 0, DateTimeKind.Unspecified), new DateTime(1900, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "Zapatillas Deportivas Urbanas", 79.99m, 75 },
                    { new Guid("a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d"), "Reloj elegante con correa de cuero y movimiento de cuarzo.", new DateTime(2024, 8, 25, 21, 45, 22, 0, DateTimeKind.Unspecified), new DateTime(1920, 2, 29, 16, 0, 0, 0, DateTimeKind.Unspecified), null, null, "Reloj de Pulsera Clásico", 99.99m, 30 },
                    { new Guid("b0a9c8d7-1f2e-3a4b-5c6d-7e8f9a0b1c2d"), "Una emocionante novela de fantasía y aventuras.", new DateTime(2021, 2, 20, 17, 7, 10, 0, DateTimeKind.Unspecified), new DateTime(1998, 12, 31, 23, 59, 59, 0, DateTimeKind.Unspecified), null, null, "Libro 'Aventuras Épicas'", 12.50m, 150 },
                    { new Guid("c8d9e0f1-2a3b-4c5d-8e6f-9a0b1c2d3e4f"), "Camiseta de manga corta, 100% algodón suave.", new DateTime(2023, 4, 18, 10, 25, 40, 0, DateTimeKind.Unspecified), new DateTime(1966, 11, 24, 7, 34, 51, 0, DateTimeKind.Unspecified), null, null, "Camiseta Básica Algodón", 19.99m, 100 },
                    { new Guid("d1c2b3a4-5f6e-7a8b-9c0d-1e2f3a4b5c6d"), "Taza de cerámica de alta calidad con diseño único.", new DateTime(2023, 9, 1, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1905, 3, 17, 14, 22, 5, 0, DateTimeKind.Unspecified), null, null, "Taza de Cerámica Decorada", 8.99m, 200 },
                    { new Guid("d4c5b6a7-8f9e-0c1d-2a3b-4c5d6e7f8a9b"), "Bolso de cuero genuino con múltiples compartimentos.", new DateTime(2025, 6, 14, 18, 32, 49, 0, DateTimeKind.Unspecified), new DateTime(1989, 7, 15, 3, 40, 20, 0, DateTimeKind.Unspecified), null, null, "Bolso de Cuero Grande", 129.99m, 20 },
                    { new Guid("e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b"), "Funda resistente para proteger tu teléfono de golpes y arañazos.", new DateTime(2020, 4, 12, 6, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(1981, 9, 2, 9, 10, 30, 0, DateTimeKind.Unspecified), null, null, "Funda Protectora para Smartphone", 24.99m, 120 },
                    { new Guid("e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b"), "Gafas de sol con lentes polarizadas para una visión clara.", new DateTime(2022, 11, 9, 8, 50, 5, 0, DateTimeKind.Unspecified), new DateTime(1945, 5, 8, 11, 0, 0, 0, DateTimeKind.Unspecified), null, null, "Gafas de Sol Polarizadas", 59.99m, 60 },
                    { new Guid("f2e3d4c5-6b7a-8d9e-0c1f-2a3b4c5d6e7f"), "Pantalón vaquero clásico de corte recto.", new DateTime(2020, 7, 3, 14, 1, 55, 0, DateTimeKind.Unspecified), new DateTime(1973, 1, 10, 18, 56, 12, 0, DateTimeKind.Unspecified), null, null, "Pantalón Vaquero Recto", 49.99m, 50 },
                    { new Guid("f4e5d6c7-8b9a-0c1d-2e3f-4a5b6c7d8e9f"), "Auriculares con conexión Bluetooth y sonido de alta fidelidad.", new DateTime(2021, 10, 30, 13, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1950, 6, 1, 10, 0, 0, 0, DateTimeKind.Unspecified), null, null, "Auriculares Inalámbricos Bluetooth", 69.99m, 80 }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RolId", "NombreRol" },
                values: new object[,]
                {
                    { new Guid("1c3f5e7a-8b9d-4e2c-9a3b-6f8d7c5e3a21"), "Staff" },
                    { new Guid("a7b9c28d-456e-4f1a-b890-3c5d6e7f8a91"), "Admin" },
                    { new Guid("e9a2b3c4-5d6f-4a8b-9c1d-2e4f6a8b7c93"), "Cliente" }
                });

            migrationBuilder.InsertData(
                table: "ProductosCategorias",
                columns: new[] { "IdProductoCategoria", "IdCategoria", "IdProducto" },
                values: new object[,]
                {
                    { new Guid("0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"), new Guid("a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d"), new Guid("e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b") },
                    { new Guid("1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"), new Guid("1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d"), new Guid("f2e3d4c5-6b7a-8d9e-0c1f-2a3b4c5d6e7f") },
                    { new Guid("2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), new Guid("c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f"), new Guid("d4c5b6a7-8f9e-0c1d-2a3b-4c5d6e7f8a9b") },
                    { new Guid("3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a"), new Guid("d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a"), new Guid("a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d") },
                    { new Guid("4e3d2c1b-a0f9-8e7d-6c5b-4a3f2e1d0c9b"), new Guid("b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), new Guid("a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d") },
                    { new Guid("5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c"), new Guid("d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a"), new Guid("d1c2b3a4-5f6e-7a8b-9c0d-1e2f3a4b5c6d") },
                    { new Guid("6d5e4f3a-2b1c-4d0e-8f7a-9b8c7d6e5f4a"), new Guid("c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f"), new Guid("d4c5b6a7-8f9e-0c1d-2a3b-4c5d6e7f8a9b") },
                    { new Guid("7c8b9a0f-1e2d-3c4b-5a6f-7e8d9c0b1a2f"), new Guid("c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f"), new Guid("e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b") },
                    { new Guid("8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d"), new Guid("b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e"), new Guid("a0b1c2d3-4e5f-6a7b-8c9d-0e1f2a3b4c5d") },
                    { new Guid("9e0d1c2b-3a4f-5e6d-7c8b-9a0f1e2d3c4b"), new Guid("f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c"), new Guid("e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b") },
                    { new Guid("b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e"), new Guid("f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c"), new Guid("f4e5d6c7-8b9a-0c1d-2e3f-4a5b6c7d8e9f") },
                    { new Guid("c0d1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5"), new Guid("e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b"), new Guid("b0a9c8d7-1f2e-3a4b-5c6d-7e8f9a0b1c2d") },
                    { new Guid("c8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f"), new Guid("a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d"), new Guid("f4e5d6c7-8b9a-0c1d-2e3f-4a5b6c7d8e9f") },
                    { new Guid("e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6"), new Guid("c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f"), new Guid("a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d") },
                    { new Guid("f9e8d7c6-5b4a-3f2e-1d0c-9b8a7f6e5d4c"), new Guid("1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d"), new Guid("c8d9e0f1-2a3b-4c5d-8e6f-9a0b1c2d3e4f") }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "PasswordHash", "Phone", "RoleId" },
                values: new object[,]
                {
                    { new Guid("a9b8c7d6-2e3f-4a5b-8c9d-1e2f3a4b5c6d"), "laura.gomez@gmail.com", "Laura Gomez", "AQAAAAIAAYagAAAAEEmsXx6ToMcEX2xiskUFwYxi2dcC6LChHVgoy+9QFY+rGpL4v8Z3rSsxmZ5YnsaoiA==", null, new Guid("e9a2b3c4-5d6f-4a8b-9c1d-2e4f6a8b7c93") },
                    { new Guid("b8d7e9f0-1a2b-4c3d-8e5f-7a9b1c3d5e7f"), "admin@nickymartin.com", "Paco Revilla", "AQAAAAIAAYagAAAAEI4teKyRLWGw0IE8AqeyRE79Mr8zKNoeMXArw/P5f7EQNqG3PGEVdY8twax2lOZZKw==", null, new Guid("a7b9c28d-456e-4f1a-b890-3c5d6e7f8a91") },
                    { new Guid("f0e1d2c3-4b5a-8d6e-9c1f-2a3b4c5d6e7f"), "lucia.sanchiz@nickymartin.com", "Marta Gonzalez", "AQAAAAIAAYagAAAAEBzupCJlqa3R2Sz8Vo0hTqm7T9IG1lXN3YIlf2coB53B1VDTpRjKrjsjM1/LLw0MDA==", null, new Guid("1c3f5e7a-8b9d-4e2c-9a3b-6f8d7c5e3a21") }
                });

            migrationBuilder.InsertData(
                table: "Direcciones",
                columns: new[] { "IdDireccion", "Ciudad", "CodigoPostal", "Domicilio", "IdUsuario", "Pais", "Provincia", "principal" },
                values: new object[,]
                {
                    { new Guid("2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), "Madrid", 28080, "Avenida Siempreviva 742", new Guid("a9b8c7d6-2e3f-4a5b-8c9d-1e2f3a4b5c6d"), "España", "Madrid", true },
                    { new Guid("3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f"), "Barcelona", 8001, "Calle de la Piruleta 15", new Guid("a9b8c7d6-2e3f-4a5b-8c9d-1e2f3a4b5c6d"), "España", "Barcelona", false }
                });

            migrationBuilder.InsertData(
                table: "Pedidos",
                columns: new[] { "IdPedido", "Estado", "FechaCreacion", "IdDireccion", "IdUsuario", "Numero", "Total" },
                values: new object[,]
                {
                    { new Guid("2f3e4d5c-6b7a-8f9e-0d1c-2b3a4f5e6d7c"), "Pendiente", new DateTime(2025, 6, 17, 14, 15, 40, 288, DateTimeKind.Local).AddTicks(7894), new Guid("2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), new Guid("a9b8c7d6-2e3f-4a5b-8c9d-1e2f3a4b5c6d"), "1", 45.99m },
                    { new Guid("d0c1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5"), "Enviado", new DateTime(2025, 6, 13, 14, 15, 40, 290, DateTimeKind.Local).AddTicks(8309), new Guid("2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"), new Guid("a9b8c7d6-2e3f-4a5b-8c9d-1e2f3a4b5c6d"), "2", 89.50m }
                });

            migrationBuilder.InsertData(
                table: "DetallesPedidos",
                columns: new[] { "IdDetalle", "Cantidad", "IdPedido", "IdProducto", "PrecioUnitario", "Subtotal" },
                values: new object[,]
                {
                    { new Guid("4e3d2c1b-a0f9-8e7d-6c5b-4a3f2e1d0c9b"), 2, new Guid("2f3e4d5c-6b7a-8f9e-0d1c-2b3a4f5e6d7c"), new Guid("c8d9e0f1-2a3b-4c5d-8e6f-9a0b1c2d3e4f"), 19.99m, 39.98m },
                    { new Guid("8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d"), 1, new Guid("2f3e4d5c-6b7a-8f9e-0d1c-2b3a4f5e6d7c"), new Guid("b0a9c8d7-1f2e-3a4b-5c6d-7e8f9a0b1c2d"), 12.50m, 12.50m },
                    { new Guid("a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"), 1, new Guid("d0c1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5"), new Guid("f4e5d6c7-8b9a-0c1d-2e3f-4a5b6c7d8e9f"), 69.99m, 69.99m },
                    { new Guid("f6e5d4c3-b2a1-0e9d-8c7b-6a5f4e3d2c1b"), 1, new Guid("d0c1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5"), new Guid("f2e3d4c5-6b7a-8d9e-0c1f-2a3b4c5d6e7f"), 49.99m, 49.99m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carritos_IdUsuario",
                table: "Carritos",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_ComentarioPadreId",
                table: "Comentarios",
                column: "ComentarioPadreId");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_ProductoId",
                table: "Comentarios",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_UsuarioId",
                table: "Comentarios",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesPedidos_IdPedido",
                table: "DetallesPedidos",
                column: "IdPedido");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesPedidos_IdProducto",
                table: "DetallesPedidos",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Direcciones_IdUsuario",
                table: "Direcciones",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_ProductoId",
                table: "Favoritos",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Favoritos_UsuarioId",
                table: "Favoritos",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsCarrito_IdCarrito",
                table: "ItemsCarrito",
                column: "IdCarrito");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsCarrito_IdProducto",
                table: "ItemsCarrito",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_MultimediaProductos_IdProducto",
                table: "MultimediaProductos",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_IdDireccion",
                table: "Pedidos",
                column: "IdDireccion");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_IdUsuario",
                table: "Pedidos",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_ProductosCategorias_IdCategoria",
                table: "ProductosCategorias",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_ProductosCategorias_IdProducto",
                table: "ProductosCategorias",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Valoraciones_ProductoId",
                table: "Valoraciones",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Valoraciones_UsuarioId",
                table: "Valoraciones",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comentarios");

            migrationBuilder.DropTable(
                name: "DetallesPedidos");

            migrationBuilder.DropTable(
                name: "Favoritos");

            migrationBuilder.DropTable(
                name: "ItemsCarrito");

            migrationBuilder.DropTable(
                name: "MultimediaProductos");

            migrationBuilder.DropTable(
                name: "ProductosCategorias");

            migrationBuilder.DropTable(
                name: "Valoraciones");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Carritos");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Direcciones");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
