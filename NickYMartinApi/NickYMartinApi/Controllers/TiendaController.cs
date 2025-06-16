using EcommerceBasicoAWS.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;
using System.Security.Claims;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendaController : ControllerBase
    {
        private readonly IProductoService _productoService;
        private readonly ICategoriaService _categoriaService;

        public TiendaController(IProductoService productoService, ICategoriaService categoriaService, ICarritoService carritoService)
        {
            _productoService = productoService;
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<IActionResult> Index(ProductosViewModel productosVm)
        {
            ProductosViewModel vm = await _productoService.GetProductos(
                                            productosVm.SearchTypes,
                                            productosVm.Filters,
                                            productosVm.CurrentPage,
                                            productosVm.ResultsPerPage);
            return Ok(vm);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> DetallesProducto(Guid idProducto)
        {
            Producto? producto = await _productoService.GetProducto(idProducto);
            List<Categoria> categorias = await _categoriaService.GetProductoCategorias(idProducto);

            ProductoCategoriasDetallesViewModel vm = new ProductoCategoriasDetallesViewModel()
            {
                Producto = producto,
                Categorias = categorias,
            };

            return Ok(vm);
        }
    }
}
