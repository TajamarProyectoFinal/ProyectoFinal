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
        public async Task<IActionResult> AddProducto(ProductoViewModel productoVm)
        {
            Producto producto = new Producto();
            producto = await _productoService.AddProducto(productoVm.Producto, productoVm.Files, productoVm.CategoriasIds);

            //ViewBag.CategoriasList = await GetCategoriasSelectList();

            if (producto.IdProducto != Guid.Empty)
            {
                return RedirectToAction(nameof(Index));
            }
            else
            {
                return Ok(new ProductoViewModel()
                {
                    Producto = productoVm.Producto,
                    CategoriasIds = productoVm.CategoriasIds,
                    Action = Enums.ActionTypes.Create
                });
            }

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

                return RedirectToAction(nameof(Index));
            }
            else
            {
                //TempData["Mensaje"] = "Se ha producido un error al actualizar el producto.";
                //TempData["TipoMensaje"] = "error";

                return Ok(new ProductoViewModel()
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

        private async Task<SelectList> GetCategoriasSelectList()
        {
            List<Categoria> categorias = await _categoriaService.GetCategorias();

            List<SelectListItem> items = new List<SelectListItem>();

            foreach (Categoria categoria in categorias)
            {
                items.Add(new SelectListItem() { Text = categoria.Nombre, Value = categoria.IdCategoria.ToString() });
            }

            return new SelectList(items, "Value", "Text");
        }
    }
}
