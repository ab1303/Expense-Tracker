using ETS.Core.Helpers;
using ETS.Core.Interfaces;
using ETS.DataCore.Intefaces;
using ETS.Jobs.Request;
using ETS.Jobs.Service.JobRequestHandlers;
using ETS.Services.Interfaces;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;

namespace ETS.Jobs.ServiceCore.JobsRequestHandlers
{
    class ProcessMonthlyExpenseFileUploadRequestHandler : AbstractRequestHandler<ProcessMonthlyExpenseFileUploadRequest>, IProcessMonthlyExpenseFileUploadRequest
    {
        private readonly IFileStorage _fileStorage;
        private readonly IRepositories _repositories;
        private readonly IDataContext _dataContext;
        private readonly ITransactionMapping _transactionMapping;

        public ProcessMonthlyExpenseFileUploadRequestHandler(
            ILogger<ProcessMonthlyExpenseFileUploadRequest> logger,
            IFileStorage fileStorage,
            IRepositories repositories,
            ITransactionMapping transactionMapping,
            IDataContext dataContext
        ) : base(logger)
        {
            this._fileStorage = fileStorage;
            this._repositories = repositories;
            this._dataContext = dataContext;
            _transactionMapping = transactionMapping;
        }

        protected override void HandleRequest(ProcessMonthlyExpenseFileUploadRequest request)
        {
            var fileBytes = _fileStorage.GetFileAsync(Core.Enums.FileFolder.MonthlyExpenseSheets, "Expense Tracker.xlsx").Result;

            var monthlyExpensesResults = FileHelper.ReadExcel<MonthlyExpenseFileImport>(fileBytes);
            Logger.LogInformation($"Number of records in the file is {monthlyExpensesResults.Length}");

            foreach (var record in monthlyExpensesResults)
            {
                var expenseRecord = _transactionMapping.MapRecord(record);

                _dataContext.Transactions.Add(expenseRecord);
            }

            Logger.LogInformation($"Process handler ProcessMonthlyExpenseFileUploadRequestHandler implemenation");
        }
    }
}
