using ETS.JobsHost;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
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
            var configuration = new ConfigurationBuilder()
                          .SetBasePath(Directory.GetCurrentDirectory())
                          .AddJsonFile("appSettings.json")
                          .AddCommandLine(args)
                          .Build();

            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration)
                .Enrich.WithProperty("SourceContext", null)
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {Message} ({SourceContext:l}){NewLine}{Exception}")
                .WriteTo.RollingFile(AppDomain.CurrentDomain.BaseDirectory + "logs\\ETS Background Service Log Dated-{Date}.log", LogEventLevel.Information, "[{Timestamp:HH:mm:ss} {Level}] {Message} ({SourceContext:l}){NewLine}{Exception}")
                .CreateLogger();

            try
            {
                Log.Information("Starting web host");
                BuildWebHost(args, configuration).Run();
                Console.ReadLine();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }

            //var host = BuildWebHost(args);

            //using (host)
            //{
            //    host.Start();
            //    Console.ReadLine();
            //}
        }

        static IWebHost BuildWebHost(string[] args, IConfigurationRoot configuration) => WebHost
                .CreateDefaultBuilder(args)
                 .UseKestrel()
                 .UseStartup<Startup>()
                 .UseUrls("http://localhost:9000")
                 .UseConfiguration(configuration)
                .UseSerilog() // <-- Add this line
                .Build();
    }
}
