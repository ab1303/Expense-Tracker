using System;
using Microsoft.WindowsAzure.Storage;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ETS.Azure
{
    internal static class ConfigurationSettings
    {
        private static IConfiguration Configuration { get; }
        static ConfigurationSettings()
        {
            var builder = new ConfigurationBuilder()
                              .SetBasePath(Directory.GetCurrentDirectory())
                              .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
        }

        public static CloudStorageAccount GetCloudStorageAccount()
        {
            var azureStorageSettings = Configuration.GetSection("AppSettings");
            var azureStorageConnectionString = azureStorageSettings["StorageConnectionString"];
             if (string.IsNullOrWhiteSpace(azureStorageConnectionString))
            {
                throw new ApplicationException("Configuration for Cloud:Storage not found.");
            }

            CloudStorageAccount cloudStorageAccount;
            if (!CloudStorageAccount.TryParse(azureStorageConnectionString, out cloudStorageAccount))
            {
                throw new ApplicationException(string.Format("{0} is not invalid connection string", azureStorageConnectionString));
            }

            return cloudStorageAccount;
        }

        public static CloudStorageAccount TryGetCloudStorageAccountForMutex()
        {
            var azureStorageConnectionString = Microsoft.Azure.CloudConfigurationManager.GetSetting("Cloud:MutexStorage");
            if (string.IsNullOrWhiteSpace(azureStorageConnectionString))
            {
                return null;
            }

            CloudStorageAccount cloudStorageAccount;
            if (!CloudStorageAccount.TryParse(azureStorageConnectionString, out cloudStorageAccount))
            {
                throw new ApplicationException(string.Format("{0} is not invalid connection string", azureStorageConnectionString));
            }

            return cloudStorageAccount;
        }
    }
}
