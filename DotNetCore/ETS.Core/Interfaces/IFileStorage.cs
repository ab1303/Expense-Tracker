using ETS.Core.Enums;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ETS.Core.Interfaces
{
    public interface IFileStorage
    {
        Task<byte[]> GetFileAsync(string containerName, string fileName);
        Task<byte[]> GetFileAsync(FileFolder fileFolder, string fileName);
        Task<byte[]> TryGetFileAsync(FileFolder fileFolder, string fileName);

        // TODO: Later
        //IList<StoredFile> GetFiles(FileFolder fileFolder, string filePrefix);

        // poll a none existing file
        Task<byte[]> AwaitFileAsync(FileFolder fileFolder, string fileName, TimeSpan timeOut);

        Task<string> StorePublicFileAsync(string fileName, byte[] fileBytes);
        Task<string> StoreFileAsync(FileFolder fileFolder, string fileName, byte[] fileBytes);

        Task<bool> DeletePublicFileAsync(string fileName);
        Task<bool> DeleteFileAsync(FileFolder fileFolder, string fileName);
        Task<string> StoreFile(FileFolder fileFolder, string fileName, string data);
        Task<bool> IsFileExists(FileFolder fileFolder, string fileName);
        Task<string> GetFileUrl(FileFolder fileFolder, string fileName);
        string SaveUploadFile(FileFolder fileFolder, string fileName, byte[] byteArray);
    }

    public sealed class StoredFile
    {
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public Lazy<byte[]> FileBytes { get; set; }
    }
}
