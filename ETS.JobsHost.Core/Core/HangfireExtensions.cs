using System;
using Hangfire;
using Hangfire.Common;
using Hangfire.Logging;
using Hangfire.Server;

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

        //public static HostConfigurator UseOwin(this HostConfigurator configurator, string baseAddress)
        //{
        //    if (string.IsNullOrEmpty(baseAddress)) throw new ArgumentNullException(nameof(baseAddress));

        //    configurator.Service(() => new Bootstrap { Address = baseAddress });

        //    return configurator;
        //}

    }
}
