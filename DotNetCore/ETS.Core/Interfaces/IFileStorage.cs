using ETS.Core.Enums;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ETS.Core.Interfaces
{
    public interface IFileStorage
    {
        byte[] GetFile(string containerName, string fileName);
        byte[] GetFile(FileFolder fileFolder, string fileName);
        byte[] TryGetFile(FileFolder fileFolder, string fileName);

        // TODO: Later
        //IList<StoredFile> GetFiles(FileFolder fileFolder, string filePrefix);

        // poll a none existing file
        byte[] AwaitFile(FileFolder fileFolder, string fileName, TimeSpan timeOut);

        string StorePublicFile(string fileName, byte[] fileBytes);
        string StoreFile(FileFolder fileFolder, string fileName, byte[] fileBytes);

        Task<bool> DeletePublicFile(string fileName);
        Task<bool> DeleteFile(FileFolder fileFolder, string fileName);
        string StoreFile(FileFolder fileFolder, string fileName, string data);
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
