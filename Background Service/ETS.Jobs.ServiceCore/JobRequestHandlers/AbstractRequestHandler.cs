using System;
using ETS.Jobs.Request;
using Serilog;

namespace ETS.Jobs.Service.JobRequestHandlers
{   
    public abstract class AbstractRequestHandler<TRequest> : IRequestHandler<TRequest> where TRequest : AbstractRequest
    {
        protected readonly ILogger Logger;

        protected AbstractRequestHandler(ILogger logger)
        {
            Logger = logger.ForContext<TRequest>();
        }

        public void Handle(TRequest request)
        {
            Logger.Information("----------------------------------");
            Logger.Information("BEGIN {0} handler. Request: {@Request} ", request.GetType().Name, request);
            try
            {
                HandleRequest(request);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                throw;
                
            }
            finally
            {
                Logger.Information("END {0} handler.", request.GetType().Name);
                Logger.Information("----------------------------------");
            }

        }

        public override string ToString()
        {
            return GetType().Name;
        }
        protected abstract void HandleRequest(TRequest request);
    }
}
