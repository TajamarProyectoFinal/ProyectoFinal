using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using NickYMartinApi.Enums;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IProductoService _productoService;
        private readonly ICategoriaService _categoriaService;

        public ProductosController(IProductoService productoService, ICategoriaService categoriaService)
        {
            _productoService = productoService;
            _categoriaService = categoriaService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index(
            [FromQuery] SearchTypes searchType,
            [FromQuery] ProductosFilters? filters,
            [FromQuery] int currentPage = 1,
            [FromQuery] int resultsPerPage = 10
        )
        {
            ProductosViewModel vm = await _productoService.GetProductos(
                                            searchType,
                                            filters,
                                            currentPage,
                                            resultsPerPage);

            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> AddProducto(
<<<<<<< main
            [FromForm] string nombre,
            [FromForm] string descripcion,
            [FromForm] decimal precio,
            [FromForm] int stock,
            [FromForm] List<IFormFile> files,
            [FromForm] List<string> categoriasIds
        )
=======
    [FromForm] string nombre,
    [FromForm] string descripcion,
    [FromForm] decimal precio,
    [FromForm] int stock,
    [FromForm] List<IFormFile> files,
    [FromForm] List<string> categoriasIds)
>>>>>>> martin
        {
            var producto = new Producto
            {
                Nombre = nombre,
                Descripcion = descripcion,
                Precio = precio,
                Stock = stock,
                FechaCreacion = DateTime.Now,
                FechaActualizacion = DateTime.Now
            };

            var resultado = await _productoService.AddProducto(producto, files, categoriasIds);

            if (resultado.IdProducto == Guid.Empty)
                return StatusCode(500, "No se ha podido añadir el producto");

            return Ok(new
            {
                producto = resultado,
                categoriasIds
            });
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> getProdutoById(Guid idProducto)
        {
            //ViewBag.CategoriasList = await GetCategoriasSelectList();
            Producto? producto = await _productoService.GetProducto(idProducto);
            List<Categoria> categorias = await _categoriaService.GetProductoCategorias(idProducto);

            return Ok(new ProductoViewModel()
            {
                Producto = producto,
                Categorias = categorias,
                CategoriasIds = categorias.Select(c => c.IdCategoria.ToString()).ToList(),
                Action = Enums.ActionTypes.Update,
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProducto(Guid idProducto, ProductoViewModel productoVm)
        {
            bool response = await _productoService.UpdateProducto(idProducto, productoVm.Producto, productoVm.Files, productoVm.CategoriasIds);
            //ViewBag.CategoriasList = await GetCategoriasSelectList();
            Producto? producto = await _productoService.GetProducto(idProducto);
            List<Categoria> categorias = await _categoriaService.GetProductoCategorias(idProducto);

            if (response)
            {
                //TempData["Mensaje"] = "El producto se actualizo correctamente.";
                //TempData["TipoMensaje"] = "success";

                return Ok("El producto se ha actualizado con exito");
            }
            else
            {
                //TempData["Mensaje"] = "Se ha producido un error al actualizar el producto.";
                //TempData["TipoMensaje"] = "error";

                return BadRequest(new ProductoViewModel()
                {
                    Producto = producto,
                    Categorias = categorias,
                    CategoriasIds = categorias.Select(c => c.IdCategoria.ToString()).ToList(),
                    Action = Enums.ActionTypes.Update,
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(Guid idProducto)
        {
            bool response = await _productoService.DeleteProducto(idProducto);
 
            return Ok(response);
        }
    }
}
