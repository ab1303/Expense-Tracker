using ETS.Jobs.RequestCore.Jobs;
using ETS.Jobs.Service.JobRequestHandlers;
using ETS.Services.Repositories;
using Serilog;

namespace ETS.Jobs.ServiceCore.JobsRequestHandlers
{
    class ProcessMonthlyExpenseFileUploadRequestHandler : AbstractRequestHandler<ProcessMonthlyExpenseFileUploadRequest>, IProcessMonthlyExpenseFileUploadRequest
    {
        private readonly IRepositories _repositories;

        public ProcessMonthlyExpenseFileUploadRequestHandler(
            ILogger logger,
            IRepositories repositories
        )
            : base(logger)
        {
            _repositories = repositories;
        }

        protected override void HandleRequest(ProcessMonthlyExpenseFileUploadRequest request)
        {
            Logger.Information($"Process handler ProcessMonthlyExpenseFileUploadRequestHandler implemenation");
        }
    }
}
