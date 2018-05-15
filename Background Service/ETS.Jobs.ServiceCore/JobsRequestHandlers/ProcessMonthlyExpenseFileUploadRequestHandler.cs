using ETS.Jobs.Request;
using ETS.Jobs.Service.JobRequestHandlers;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;

namespace ETS.Jobs.ServiceCore.JobsRequestHandlers
{
    class ProcessMonthlyExpenseFileUploadRequestHandler : AbstractRequestHandler<ProcessMonthlyExpenseFileUploadRequest>, IProcessMonthlyExpenseFileUploadRequest
    {

        public ProcessMonthlyExpenseFileUploadRequestHandler(
            ILogger<ProcessMonthlyExpenseFileUploadRequest> logger,
            IRepositories repositories
        ) : base(logger)
        {
        }

        protected override void HandleRequest(ProcessMonthlyExpenseFileUploadRequest request)
        {
            Logger.LogInformation($"Process handler ProcessMonthlyExpenseFileUploadRequestHandler implemenation");
        }
    }
}
