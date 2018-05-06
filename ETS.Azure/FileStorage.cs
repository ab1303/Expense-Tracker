﻿using ETS.Core.Enums;
using ETS.Core.Extensions;
using ETS.Core.Interfaces;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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

        private string CreateBlob(string containerName, string fileName, byte[] fileBytes, bool publicAccess = false)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                throw new ArgumentNullException("fileName", "The fileName cannot be null.");

            if (fileBytes == null)
                throw new ArgumentNullException("fileBytes", "The fileBytes cannot be null.");

            var blob = CreateBlob(containerName, fileName, publicAccess);

            if (fileBytes.Length <= MaxBlobSize)
            {
                blob.UploadFromByteArrayAsync(fileBytes, 0, fileBytes.Length);
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
                    blob.PutBlockAsync(blockIDs.Last(), memoryStream, null);
                    bytesWritten += MaxBlobSize;
                }
            }

            blob.PutBlockListAsync(blockIDs);
            return blob.Uri.ToString();
        }

        private string CreateBlob(string containerName, string fileName, string data, bool publicAccess = false)
        {
            var blob = CreateBlob(containerName, fileName, publicAccess);

            blob.UploadTextAsync(data);

            return blob.Uri.ToString();
        }

        private CloudBlockBlob CreateBlob(string containerName, string fileName, bool publicAccess = false)
        {
            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(containerName.ToLower());

            container.CreateIfNotExistsAsync();

            if (publicAccess)
            {
                var containerPermissions = new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Blob
                };
                container.SetPermissionsAsync(containerPermissions);
            }
            var blob = container.GetBlockBlobReference(fileName);
            blob.Properties.ContentType = Path.GetExtension(fileName).GetContentType();

            return blob;
        }

        #endregion

        #region IFileStorage implementation

        public byte[] GetFile(string containerName, string fileName)
        {
            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(containerName);

            byte[] blobBytes;
            using (var stream = new MemoryStream())
            {
                container.GetBlockBlobReference(fileName).DownloadToStreamAsync(stream);
                blobBytes = stream.ToArray();
            }
            return blobBytes;
        }

        public byte[] GetFile(FileFolder fileFolder, string fileName)
        {
            return GetFile(fileFolder.ToString().ToLower(), fileName);
        }

        public byte[] TryGetFile(FileFolder fileFolder, string fileName)
        {
            try
            {
                return GetFile(fileFolder, fileName);
            }
            catch (StorageException)
            {
                return null;
            }
        }

        public byte[] AwaitFile(FileFolder fileFolder, string fileName, TimeSpan timeOut)
        {
            byte[] fileBytes = null;
            var elapsed = 0;
            while ((fileBytes == null) && (elapsed < timeOut.TotalMilliseconds))
            {
                Thread.Sleep(5000);
                elapsed += 5000;
                try
                {
                    fileBytes = GetFile(fileFolder, fileName);
                }
                catch (Exception)
                {
                }
            }

            return fileBytes;
        }

        public string StorePublicFile(string fileName, byte[] fileBytes)
        {
            return CreateBlob(FileFolder.PublicFile.ToString(), fileName, fileBytes, true);
        }

        public string StoreFile(FileFolder fileFolder, string fileName, byte[] fileBytes)
        {
            return CreateBlob(fileFolder.ToString(), fileName, fileBytes); ;
        }

        public Task<bool> DeletePublicFile(string fileName)
        {
            return DeleteFile(FileFolder.PublicFile, fileName);
        }

        public Task<bool> DeleteFile(FileFolder fileFolder, string fileName)
        {
            var client = _cloudStorageAccount.CreateCloudBlobClient();
            var container = client.GetContainerReference(fileFolder.ToString().ToLower());
            var blob = container.GetBlockBlobReference(fileName);
            return blob.DeleteIfExistsAsync();
        }

        public string StoreFile(FileFolder fileFolder, string fileName, string data)
        {
            return CreateBlob(fileFolder.ToString(), fileName, data);
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
