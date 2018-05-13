using System;
using ETS.Jobs.Request;
using Microsoft.Extensions.Logging;

namespace ETS.Jobs.Service.JobRequestHandlers
{   
    public abstract class AbstractRequestHandler<TRequest> : IRequestHandler<TRequest> where TRequest : AbstractRequest
    {
        protected readonly ILogger Logger;

        protected AbstractRequestHandler(ILogger<TRequest> logger)
        {
            Logger = logger;
        }

        public void Handle(TRequest request)
        {
            Logger.LogInformation("----------------------------------");
            Logger.LogInformation("BEGIN {0} handler. Request: {@Request} ", request.GetType().Name, request);
            try
            {
                HandleRequest(request);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                throw;
                
            }
            finally
            {
                Logger.LogInformation("END {0} handler.", request.GetType().Name);
                Logger.LogInformation("----------------------------------");
            }

        }

        public override string ToString()
        {
            return GetType().Name;
        }
        protected abstract void HandleRequest(TRequest request);
    }
}
