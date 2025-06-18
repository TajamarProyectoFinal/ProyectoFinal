using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using NickYMartinApi.Repositories;

namespace NickYMartinApi.Services
{
    public class DireccionService : IDireccionService
    {
        private readonly IDireccionesRepository _direccionesRepository;

        public DireccionService(IDireccionesRepository direccionesRepository)
        {
            _direccionesRepository = direccionesRepository;
        }

        public async Task<Direccion> AddUserDireccion(Direccion direccion)
        {
           Direccion direccionCreada =  await _direccionesRepository.AddDireccion(direccion);

            return direccionCreada;
        }

        public async Task<bool> AddUserListDirecciones(List<Direccion> direcciones)
        {
            bool response = await _direccionesRepository.AddUserListDirecciones(direcciones);

            return response;
        }

        public async Task<Direccion?> GetDireccion(Guid idDireccion)
        {
            Direccion? direccion = await _direccionesRepository.GetDireccion(idDireccion);

            return direccion;
        }

        public async Task<List<Direccion>> GetUserDirecciones(Guid userId)
        {
            List<Direccion> direcciones = await _direccionesRepository.GetUserDirecciones(userId);

            return direcciones;
        }

        public async Task<bool> RemoveUserDireccion(Guid IdDireccion)
        {
            Direccion? direccion = await _direccionesRepository.GetDireccion(IdDireccion);
            if(direccion != null)
            {
                bool response =  await _direccionesRepository.RemoveDireccion(direccion);
                return response;
            }

            return false;
        }

        public async Task<Direccion> UpdateUserDireccion(Direccion direccion)
        {
            Direccion direccionActualizada = await _direccionesRepository.UpdateDireccion(direccion);

            return direccionActualizada;
        }
    }
}
