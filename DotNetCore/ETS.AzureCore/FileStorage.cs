using ETS.Core.Enums;
using ETS.Core.Extensions;
using ETS.Core.Interfaces;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ETS.Azure
{
    public class FileStorage : IFileStorage
    {
        private readonly CloudStorageAccount _cloudStorageAccount;
        private const int MaxBlobSize = 4194304;

        public FileStorage()
        {
            _cloudStorageAccount = ConfigurationSettings.GetCloudStorageAccount();
        }

        #region Private Methods/Functions

        private async Task<string> CreateBlobAsync(string containerName, string fileName, byte[] fileBytes, bool publicAccess = false)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                throw new ArgumentNullException(nameof(fileName), "The fileName cannot be null.");

            if (fileBytes == null)
                throw new ArgumentNullException(nameof(fileBytes), "The fileBytes cannot be null.");

            var blob = await CreateBlobAsync(containerName, fileName, publicAccess);

            if (fileBytes.Length <= MaxBlobSize)
            {
                await blob.UploadFromByteArrayAsync(fileBytes, 0, fileBytes.Length);
                return blob.Uri.ToString();
            }

            var blockIDs = new List<string>();
            var bytesWritten = 0;
            for (var index = 0; bytesWritten < fileBytes.Length; index++)
            {
                using (
                    var memoryStream = new MemoryStream(fileBytes, bytesWritten,
                        (bytesWritten + MaxBlobSize) < fileBytes.Length ? MaxBlobSize : (fileBytes.Length - bytesWritten)))
                {
                    blockIDs.Add(Convert.ToBase64String(BitConverter.GetBytes(index)));
                    await blob.PutBlockAsync(blockIDs.Last(), memoryStream, null);
                    bytesWritten += MaxBlobSize;
                }
            }

            await blob.PutBlockListAsync(blockIDs);
            return blob.Uri.ToString();
        }

        private async Task<string> CreateBlobAsync(string containerName, string fileName, string data, bool publicAccess = false)
        {
            var blob = await CreateBlobAsync(containerName, fileName, publicAccess);

            await blob.UploadTextAsync(data);

            return blob.Uri.ToString();
        }

        private async Task<CloudBlockBlob> CreateBlobAsync(string containerName, string fileName, bool publicAccess = false)
        {
            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(containerName.ToLower());

            await container.CreateIfNotExistsAsync();

            if (publicAccess)
            {
                var containerPermissions = new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Blob
                };
                await container.SetPermissionsAsync(containerPermissions);
            }
            var blob = container.GetBlockBlobReference(fileName);
            blob.Properties.ContentType = Path.GetExtension(fileName).GetContentType();

            return blob;
        }

        #endregion

        #region IFileStorage implementation

        public async Task<byte[]> GetFileAsync(string containerName, string fileName)
        {
            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(containerName);

            byte[] blobBytes;
            using (var stream = new MemoryStream())
            {
                await container.GetBlockBlobReference(fileName).DownloadToStreamAsync(stream);
                blobBytes = stream.ToArray();
            }
            return blobBytes;
        }

        public async Task<byte[]> GetFileAsync(FileFolder fileFolder, string fileName)
        {
            return await GetFileAsync(fileFolder.ToString().ToLower(), fileName);
        }

        public async Task<byte[]> TryGetFileAsync(FileFolder fileFolder, string fileName)
        {
            try
            {
                return await GetFileAsync(fileFolder, fileName);
            }
            catch (StorageException)
            {
                return null;
            }
        }

        public async Task<byte[]> AwaitFileAsync(FileFolder fileFolder, string fileName, TimeSpan timeOut)
        {
            byte[] fileBytes = null;
            var elapsed = 0;
            while ((fileBytes == null) && (elapsed < timeOut.TotalMilliseconds))
            {
                Thread.Sleep(5000);
                elapsed += 5000;
                try
                {
                    fileBytes = await GetFileAsync(fileFolder, fileName);
                }
                catch (Exception)
                {
                }
            }

            return fileBytes;
        }

        public async Task<string> StorePublicFileAsync(string fileName, byte[] fileBytes)
        {
            return await CreateBlobAsync(FileFolder.PublicFile.ToString(), fileName, fileBytes, true);
        }

        public async Task<string> StoreFileAsync(FileFolder fileFolder, string fileName, byte[] fileBytes)
        {
            return await CreateBlobAsync(fileFolder.ToString(), fileName, fileBytes); ;
        }

        public Task<bool> DeletePublicFileAsync(string fileName)
        {
            return DeleteFileAsync(FileFolder.PublicFile, fileName);
        }

        public Task<bool> DeleteFileAsync(FileFolder fileFolder, string fileName)
        {
            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(fileFolder.ToString().ToLower());
            var blob = container.GetBlockBlobReference(fileName);
            return blob.DeleteIfExistsAsync();
        }

        public async Task<string> StoreFile(FileFolder fileFolder, string fileName, string data)
        {
            return await CreateBlobAsync(fileFolder.ToString(), fileName, data);
        }

        public Task<bool> IsFileExists(FileFolder fileFolder, string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                return Task.FromResult(false);

            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(fileFolder.ToString().ToLower());
            var blob = container.GetBlockBlobReference(fileName);
            return blob.ExistsAsync();
        }

        public async Task<string> GetFileUrl(FileFolder fileFolder, string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                return null;

            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(fileFolder.ToString().ToLower());
            var blob = container.GetBlockBlobReference(fileName);

            var blobResult = await blob.ExistsAsync();
            return blobResult ? blob.StorageUri.PrimaryUri.AbsoluteUri : null;
        }

        public string SaveUploadFile(FileFolder fileFolder, string fileName, byte[] byteArray)
        {
            string targetFilePath;

            try
            {
                var fileExt = fileName.Substring(fileName.LastIndexOf(".", StringComparison.Ordinal));
                var contentId = Guid.NewGuid().ToString().ToUpper();
                var tmpFolder = Path.Combine(Path.GetTempPath(), FilePath.TmpFolder);

                if (!Directory.Exists(tmpFolder))
                {
                    Directory.CreateDirectory(tmpFolder);
                }
                targetFilePath = Path.Combine(tmpFolder, string.Format("{0}{1}", contentId, fileExt));
                
                File.WriteAllBytes(targetFilePath, byteArray);
            }
            catch (Exception)
            {
                targetFilePath = string.Empty;
            }

            return targetFilePath;
        }


        #endregion
    }
}
