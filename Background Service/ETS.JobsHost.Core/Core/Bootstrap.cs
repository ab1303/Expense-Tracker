using System;
using Hangfire.Logging;

namespace ETS.JobsHost.Core
{
    //public class Bootstrap : ServiceControl
    //{
    //    // TODO: Lookup the logger for Bootstrap
    //    private static readonly ILog _logger = LogProvider.For<Bootstrap>();
    //    private IDisposable webApp;
    //    public string Address { get; set; }
    //    public bool Start(HostControl hostControl)
    //    {
    //        try
    //        {
    //            webApp = WebApp.Start<OwinStartup>(Address);
    //            return true;
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.ErrorException("Topshelf starting occured errors.", ex);
    //            return false;
    //        }

    //    }

    //    public bool Stop(HostControl hostControl)
    //    {
    //        try
    //        {
    //            webApp?.Dispose();
    //            return true;
    //        }
    //        catch (Exception ex)
    //        {
    //            _logger.ErrorException($"Topshelf stopping occured errors.", ex);
    //            return false;
    //        }

    //    }
    //}
}
