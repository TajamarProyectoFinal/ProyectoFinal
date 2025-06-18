using NickYMartinApi.Models;

namespace NickYMartinApi.Interfaces
{
    public interface IDireccionService
    {
        public Task<Direccion> GetDireccion(Guid idDireccion);
        public Task<List<Direccion>> GetUserDirecciones(Guid userId);
        public Task<bool> AddUserListDirecciones(List<Direccion> direcciones);
        public Task<Direccion> AddUserDireccion(Direccion direccion);
        public Task<Direccion> UpdateUserDireccion(Direccion direccion);
        public Task<bool> RemoveUserDireccion(Guid IdDireccion);
    }
}
