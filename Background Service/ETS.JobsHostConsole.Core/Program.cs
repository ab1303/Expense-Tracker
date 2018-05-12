using ETS.JobsHost;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using System;
using System.IO;

namespace ETS.JobsHostConsole.Core
{
    class Program
    {
        static void Main(string[] args = null)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.WithProperty("SourceContext", null)
                .MinimumLevel.Information()
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {Message} ({SourceContext:l}){NewLine}{Exception}")
                .WriteTo.RollingFile(AppDomain.CurrentDomain.BaseDirectory + "logs\\ETS Background Service Log Dated-{Date}.log", LogEventLevel.Information, "[{Timestamp:HH:mm:ss} {Level}] {Message} ({SourceContext:l}){NewLine}{Exception}")
                .CreateLogger();


            var config = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appSettings.json")
               .AddCommandLine(args)
               .Build();

        var host=    WebHost
                .CreateDefaultBuilder(args)
                .ConfigureLogging((hostingContext, logging) =>
                 {
                     logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                     logging.AddConsole();
                     logging.AddDebug();
                 })
                 .UseKestrel()
                 .UseStartup<Startup>()                    
                 .UseUrls("http://localhost:9000")
                 .UseConfiguration(config)
                 .Build();

            using (host)
            {
                host.Start();
                Console.ReadLine();
            }
        }
    }
}
