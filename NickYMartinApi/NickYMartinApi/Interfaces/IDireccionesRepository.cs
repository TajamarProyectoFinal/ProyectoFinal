using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface IDireccionesRepository
    {
        public Task<Direccion?> GetDireccion(Guid idDireccion);
        public Task<List<Direccion>> GetUserDirecciones(Guid userId);
        public Task<bool> AddUserListDirecciones(List<Direccion> direcciones);
        public Task<Direccion> AddDireccion(Direccion direccion);
        public Task<Direccion> UpdateDireccion(Direccion direccion);
        public Task<bool> RemoveDireccion(Direccion direccion);
    }
}
