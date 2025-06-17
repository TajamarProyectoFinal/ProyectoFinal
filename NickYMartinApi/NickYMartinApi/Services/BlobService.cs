using Azure.Storage.Blobs;
using NickYMartinApi.Interfaces;
using NickYMartinApi.Models;
using System.Reflection.Metadata;

namespace NickYMartinApi.Services
{
    public class BlobService : IBlobService
    {
        private readonly BlobContainerClient _container;

        public BlobService(BlobServiceClient client, string containerName)
        {
            _container = client.GetBlobContainerClient(containerName);
        }

        //Actualiza o sobreescribe el archivo
        public async Task<bool> UploadFile(Stream file, string fileName)
        {
            try
            {
                BlobClient client = _container.GetBlobClient(fileName);

                await client.UploadAsync(file);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al subir el archivo: {ex.Message}");
                return false;
            }
        }

        public async Task Delete(string blobName)
        {
            BlobClient client = _container.GetBlobClient(blobName);
            await client.DeleteIfExistsAsync();
        }

        public async Task<string?> GetPictureUrl(string blobName)
        {
            BlobClient client = _container.GetBlobClient(blobName);

            if (await client.ExistsAsync())
            {
                string url = client.Uri.AbsoluteUri;
                return url;
            }

            return null;
        }
    }
}
