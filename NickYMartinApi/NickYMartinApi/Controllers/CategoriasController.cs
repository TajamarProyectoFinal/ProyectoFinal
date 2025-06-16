using EcommerceBasicoAWS.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;

namespace NickYMartinApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriasController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<Categoria> categorias = await _categoriaService.GetCategorias();

            return Ok(categorias);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategoria(Categoria categoria)
        {

            if (ModelState.IsValid)
            {
                await _categoriaService.AddCategoria(categoria);

                return RedirectToAction(nameof(Index));
            }

            return Ok(new CategoriaViewModel()
                {
                    Categoria = categoria,
                    Action = Enums.ActionTypes.Create
                }
            );
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getCategoria(Guid idCategoria)
        {
            Categoria? categoria = await _categoriaService.GetCategoria(idCategoria);

            return Ok(new CategoriaViewModel()
            {
                Categoria = categoria,
                Action = Enums.ActionTypes.Update
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCategoria(Guid idCategoria, Categoria categoria)
        {

            if (ModelState.IsValid)
            {
                bool response = await _categoriaService.UpdateCategoria(idCategoria, categoria);

                if (!response)
                {
                    return Ok(new CategoriaViewModel()
                    {
                        Categoria = categoria,
                        Action = Enums.ActionTypes.Update
                    });
                }

                return RedirectToAction(nameof(Index));
            }

            return Ok(new CategoriaViewModel()
            {
                Categoria = categoria,
                Action = Enums.ActionTypes.Update
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(Guid idCategoria)
        {
            await _categoriaService.RemoveCategoria(idCategoria);

            return Ok("Categoria eliminada correctamente");
        }
    }
}
