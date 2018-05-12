using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace ETS.JobsHost
{
    public class HangfireSettings
    {
        public IConfiguration Configuration { get; }

        public HangfireSettings()
        {
            var builder = new ConfigurationBuilder()
             .SetBasePath(Directory.GetCurrentDirectory())
             .AddJsonFile("appsettings.json");

            Configuration = builder.Build();
        }

        private static readonly Lazy<HangfireSettings> _instance = new Lazy<HangfireSettings>(() => new HangfireSettings());

        public static HangfireSettings Instance => _instance.Value;

        /// <summary>
        /// Windows ServiceName
        /// </summary>
        public string ServiceName => Configuration.GetSection("Hangfire:Server")["ServiceName"];
        /// <summary>
        /// Windows ServiceDisplayName
        /// </summary>
        public string ServiceDisplayName => Configuration.GetSection("Hangfire:Server")["ServiceDisplayName"];
               /// <summary>
        /// Windows ServiceAddress
        /// </summary>
        public string ServiceAddress => Configuration.GetSection("Hangfire:Server")["ServiceAddress"];

     

        /// <summary>
        /// hangfire login user
        /// </summary>
        public string LoginUser => Configuration.GetSection("Hangfire:Login")["User"];

        /// <summary>
        /// hangfire login pwd
        /// </summary>
        public string LoginPwd => Configuration.GetSection("Hangfire:Login")["Password"];

        /// <summary>
        /// hangfire polling interval in Seconds
        /// </summary>
        public int PollingInterval
        {
            get
            {
                Int32.TryParse(Configuration.GetSection("Hangfire:Server")["PollingInterval"], out int pollingInterval);
                return pollingInterval > 0 ? pollingInterval : 10;
            }
        }


        /// <summary>
        /// Hangfire sql server connectionstring
        /// </summary>
        public string HangfireSqlserverConnectionString => Configuration.GetConnectionString("DataConnection");
    }
}
