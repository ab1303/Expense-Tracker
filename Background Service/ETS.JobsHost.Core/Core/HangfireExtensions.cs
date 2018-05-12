using System;
using Hangfire;
using Hangfire.Logging;
using Hangfire.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

namespace ETS.JobsHost.Core
{
    public static class HangfireExtensions
    {
        public static void Console(this ILog logger, string message, PerformContext context, bool loggerEnabled = true)
        {
            if (string.IsNullOrEmpty(message)) throw new ArgumentNullException(nameof(message));
            if (context == null) throw new ArgumentNullException(nameof(context));

            //TODO: Abdul, 
            //context.WriteLine(message);
            if (loggerEnabled) logger.Info(message);
        }

        public static IApplicationBuilder ConfigureHangfire(this IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
           
            //The following line is also optional, if you required to monitor your jobs.
            //Make sure you're adding required authentication 
            app.UseHangfireDashboard();
            app.UseHangfireServer();

            return app;

        }

    }
}
