namespace NickYMartinApi.Interfaces
{
    public interface IBlobService
    {
        Task<string?> GetPictureUrl(string blobName);
        Task<bool> UploadFile(Stream file, string fileName);
        Task Delete(string blobName);
    }
}
