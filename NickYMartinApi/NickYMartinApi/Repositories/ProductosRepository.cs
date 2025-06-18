using NickYMartinApi.Data;
using NickYMartinApi.Enums;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace NickYMartinApi.Repositories
{
    public class ProductosRepository : IProductosRepository
    {
        private readonly ApplicationDbContext? _context;
        private readonly ILogger<ProductosRepository> _logger;
        private readonly IBlobService _blobService;

        public ProductosRepository(
            ApplicationDbContext context, 
            ILogger<ProductosRepository> logger, 
            IBlobService blobService)
        {
            _context = context;
            _logger = logger;
            _blobService = blobService;
        }

        public async Task<bool> AddMultimediasProducto(Guid idProducto, List<IFormFile> files)
        {
            Producto? producto = await _context.Productos.SingleOrDefaultAsync(p => p.IdProducto == idProducto);

            bool respuesta = false;
            if(files == null || files.Count() == 0)
            {
                return respuesta;
            }

            try
            {
                string tipoPrevio = "";
                int ordenPrevio = 1;
                int orden = 1;
                bool updateProducto = false;
                foreach (IFormFile file in files)
                {
                    ordenPrevio = orden;
                    string tipo = GetFileType(file.FileName);
                    if (tipo != tipoPrevio)
                    {
                        orden = 1;
                    }
                    else
                    {
                        orden = ordenPrevio;
                    }

                    MultimediaProducto prevMultimediaProducto = await _context.MultimediaProductos.OrderByDescending(o => o.Orden).FirstOrDefaultAsync(
                        m => m.IdProducto == idProducto && m.Tipo == tipo
                    );

                    if(prevMultimediaProducto != null)
                    {
                        orden = prevMultimediaProducto.Orden + 1;
                    }

                    var stream = file.OpenReadStream();
                    string fileName = $"{Guid.NewGuid()}_{file.Name}";

                    bool uploadSuccess = await _blobService.UploadFile(stream, fileName);

                    if (uploadSuccess) 
                    {
                        string fileUrl = await _blobService.GetPictureUrl(fileName);
                        MultimediaProducto multimediaProducto = new MultimediaProducto()
                        {
                            IdProducto = idProducto,
                            NombreArchivo = fileName,
                            Descripcion = tipo + " " + file.Name,
                            Url = fileUrl,
                            Tipo = tipo,
                            Orden = orden,
                            FechaCreacion = DateTime.Now,
                        };

                        if(tipo == ITiposMultimedia.IMAGEN && orden == 1)
                        {
                            producto.MainImagenUrl = fileUrl;
                            updateProducto = true;
                        }
                        else if(tipo == ITiposMultimedia.VIDEO && orden == 1)
                        {
                            producto.MainTrailerUrl = fileUrl;
                            updateProducto = true;
                        }

                        await _context.MultimediaProductos.AddAsync(multimediaProducto);
                        orden++;
                    }

                }

                if (updateProducto)
                {
                    _context.Productos.Update(producto);
                }

                await _context.SaveChangesAsync();
                respuesta = true;
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);
            }

            return respuesta;
        }

        public string GetFileType(string filename)
        {
            string type = ITiposMultimedia.OTRO; // Tipo por defecto

            if (string.IsNullOrEmpty(filename))
            {
                return type;
            }

            // Obtener la extensión del archivo y convertirla a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas
            string extension = Path.GetExtension(filename)?.ToLowerInvariant();

            if (extension != null)
            {
                string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff", ".tif" };
                if (imageExtensions.Contains(extension))
                {
                    type = ITiposMultimedia.IMAGEN;
                }
                else if (new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv" }.Contains(extension))
                {
                    type = ITiposMultimedia.VIDEO;
                }
                else if (new[] { ".pdf", ".doc", ".docx", ".txt" }.Contains(extension))
                {
                    type = ITiposMultimedia.DOCUMENTO;
                }
                else if (new[] { ".mp3", ".wav", ".aac" }.Contains(extension))
                {
                    type = ITiposMultimedia.AUDIO;
                }
            }

            return type;
        }
        public async Task<Producto?> AddProducto(Producto producto)
        {
            try
            {
                producto.FechaCreacion = DateTime.Now;
                producto.FechaActualizacion = DateTime.Now;
                await _context.Productos.AddAsync(producto);
                await _context.SaveChangesAsync();

                return producto;
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return null;
            }
        }

        public async Task<bool> DeleteProducto(Guid id)
        {
            Producto? producto = await GetProducto(id);

            bool response = false;

            if (producto != null && producto.IdProducto == id)
            {
                try
                {
                    _context.Productos.Remove(producto);
                    _context.SaveChanges(true);
                    response = true;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                    response = false;
                }
            }

            return response;
        }

        public async Task<Producto?> GetProducto(Guid id)
        {
            Producto? producto = await _context.Productos.SingleOrDefaultAsync(p => p.IdProducto == id);

            return producto;
        }

        public async Task<MultimediaProducto> GetProductoMainImage(Guid idProducto)
        {
            MultimediaProducto? mainImage = await _context.MultimediaProductos
                .SingleOrDefaultAsync(m =>
                    m.IdProducto == idProducto
                    && m.Tipo == ITiposMultimedia.IMAGEN
                    && m.Orden == 1
                );

            return mainImage;
        }

        public async Task<List<MultimediaProducto>> GetProductoMultimedia(Guid idProducto)
        {
            List<MultimediaProducto> multimediaProducto = await _context.MultimediaProductos
                    .Where(m => m.IdProducto == idProducto)
                    .ToListAsync();

            return multimediaProducto;
        }

        public async Task<ProductosViewModel> GetProductos(
            SearchTypes searchType = SearchTypes.List,
            ProductosFilters? filters = null,
            int page = 1,
            int resultsPerPage = 5)
        {
            IQueryable<Producto> query = _context.Productos;
            IQueryable<Producto> queryTotalResults = _context.Productos;
            int totalResults = 0;

            if (searchType == SearchTypes.List)
            {
                query = query
                    .Skip((page - 1) * resultsPerPage)
                    .Take(resultsPerPage);

                totalResults = await queryTotalResults.CountAsync();
            }
            else if (filters != null)
            {
                if (!string.IsNullOrEmpty(filters.Nombre))
                {
                    query = query.Where(p => p.Nombre.Contains(filters.Nombre));
                    queryTotalResults = queryTotalResults.Where(p => p.Nombre.Contains(filters.Nombre));
                }

                if (!string.IsNullOrEmpty(filters.Descripcion))
                {
                    query = query.Where(p => p.Descripcion.Contains(filters.Descripcion));
                    queryTotalResults = queryTotalResults.Where(p => p.Descripcion.Contains(filters.Descripcion));
                }

                if (filters.Precio.HasValue && filters.Precio >= 0)
                {
                    query = query.Where(p => p.Precio >= filters.Precio);
                    queryTotalResults = queryTotalResults.Where(p => p.Precio >= filters.Precio);
                }

                if (filters.Stock.HasValue && filters.Stock >= 0)
                {
                    query = query.Where(p => p.Stock >= filters.Stock);
                    queryTotalResults = queryTotalResults.Where(p => p.Stock >= filters.Stock);
                }

                if (filters.FechaCreacion.HasValue)
                {
                    query = query.Where(p => p.FechaCreacion >= filters.FechaCreacion && p.FechaCreacion < DateTime.Now);
                    queryTotalResults = queryTotalResults.Where(p => p.FechaCreacion >= filters.FechaCreacion && p.FechaCreacion < DateTime.Now);
                }

                if (filters.FechaActualizacion.HasValue)
                {
                    query = query.Where(p => p.FechaActualizacion >= filters.FechaActualizacion && p.FechaActualizacion < DateTime.Now);
                    queryTotalResults = queryTotalResults.Where(p => p.FechaActualizacion >= filters.FechaActualizacion && p.FechaActualizacion < DateTime.Now);
                }

                query = query
                    .Skip((page - 1) * resultsPerPage)
                    .Take(resultsPerPage);

                totalResults = await queryTotalResults.CountAsync();
            }

            List<Producto> productos = await query.ToListAsync();

            List<ProductoCategoriasViewModel> productosCategoriasVm = new List<ProductoCategoriasViewModel>();

            foreach (Producto producto in productos)
            {
                List<Categoria> categorias = _context.ProductosCategorias
                    .Where(c => c.IdProducto == producto.IdProducto)
                    .Select(categoria => new Categoria()
                    {
                        IdCategoria = categoria.IdCategoria,
                        Nombre = categoria.Categoria.Nombre
                    }).ToList();

                MultimediaProducto mainImageMultimedia = await GetProductoMainImage(producto.IdProducto);

                ProductoCategoriasViewModel productoCategoriasVm = new ProductoCategoriasViewModel()
                {
                    Producto = producto,
                    Categorias = categorias,
                    MainImageUrl = mainImageMultimedia != null ? mainImageMultimedia.Url : "",
                };

                productosCategoriasVm.Add(productoCategoriasVm);
            }


            return new ProductosViewModel {
                SearchTypes = searchType,
                Productos = productosCategoriasVm,
                Filters = filters,
                CurrentPage = page,
                ResultsPerPage = resultsPerPage,
                TotalResults = totalResults
            };
        }



        public bool UpdateProducto(Producto producto)
        {
            bool response = false;
            try
            {
                _context.Productos.Update(producto);
                _context.SaveChanges();
                response = true;
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message);                
            }

            return response;
        }
    }
}
