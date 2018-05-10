using System;
using ETS.JobsHost.Core;
using Serilog;
using Serilog.Events;

namespace ETS.JobsHost
{
    class Program
    {
        static void Main(string[] args = null)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.WithProperty("SourceContext", null)
                .MinimumLevel.Information()
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {Message} ({SourceContext:l}){NewLine}{Exception}")
                .WriteTo.RollingFile(AppDomain.CurrentDomain.BaseDirectory + "logs\\Cyrisk Background Service Log Dated-{Date}.log", LogEventLevel.Information, "[{Timestamp:HH:mm:ss} {Level}] {Message} ({SourceContext:l}){NewLine}{Exception}")
                .CreateLogger();


            //WebHost.CreateDefaultBuilder(args)
            //    .UseStartup<Startup>()
            //    .Build();

            //using (var server = new BackgroundJobServer())
            //{
            //    Console.WriteLine("Hangfire Server started. Press any key to exit...");
            //    Console.ReadKey();
            //}


            ////Topshelf
            //HostFactory.Run(x =>
            //{
            //    x.UseSerilog();

            //    x.RunAsLocalSystem();

            //    x.SetServiceName(HangfireSettings.Instance.ServiceName);
            //    x.SetDisplayName(HangfireSettings.Instance.ServiceDisplayName);
            //    x.SetDescription(HangfireSettings.Instance.ServiceDescription);

            //    x.UseOwin(baseAddress: HangfireSettings.Instance.ServiceAddress);

            //    x.SetStartTimeout(TimeSpan.FromMinutes(5));
            //    //https://github.com/Topshelf/Topshelf/issues/165
            //    x.SetStopTimeout(TimeSpan.FromMinutes(35));

            //    x.EnableServiceRecovery(r => { r.RestartService(1); });
            //});


        }
    }
}
