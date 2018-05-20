using ETS.Core.Helpers;
using ETS.Core.Interfaces;
using ETS.Jobs.Request;
using ETS.Jobs.Service.JobRequestHandlers;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;

namespace ETS.Jobs.ServiceCore.JobsRequestHandlers
{
    class ProcessMonthlyExpenseFileUploadRequestHandler : AbstractRequestHandler<ProcessMonthlyExpenseFileUploadRequest>, IProcessMonthlyExpenseFileUploadRequest
    {
        private readonly IFileStorage fileStorage;

        public ProcessMonthlyExpenseFileUploadRequestHandler(
            ILogger<ProcessMonthlyExpenseFileUploadRequest> logger,
            IFileStorage fileStorage,
            IRepositories repositories
        ) : base(logger)
        {
            this.fileStorage = fileStorage;
        }

        protected override async void HandleRequest(ProcessMonthlyExpenseFileUploadRequest request)
        {
            var fileBytes = await fileStorage.GetFileAsync(Core.Enums.FileFolder.MonthlyExpenseSheets, "Expense Tracker.xlsx");

            var monthlyExpensesResults = FileHelper.ReadExcel<MonthlyExpenseFileImport>(fileBytes);
            Logger.LogInformation($"Number of records in the file is {monthlyExpensesResults.Length}");


            Logger.LogInformation($"Process handler ProcessMonthlyExpenseFileUploadRequestHandler implemenation");
        }
    }
}
