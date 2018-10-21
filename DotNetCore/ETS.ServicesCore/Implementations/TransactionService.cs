using System;
using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.DTO;
using ETS.Services.Interfaces;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Results;

namespace ETS.Services.Implementations
{
    public class TransactionService : AbstractService<Transaction>, ITransactionService
    {
        private readonly ILogger _logger;
        private readonly IDataContext _dataContext;
        private readonly IRepositories _repositories;

        public TransactionService(IDataContext dataContext, IRepositories repositories, ILoggerFactory loggerFactory) 
            :base(repositories.Transaction)
        {
            _logger = loggerFactory.CreateLogger<Transaction>();
            _dataContext = dataContext;
            _repositories = repositories;
        }


        public ServiceResult UpdateTransactions(long[] transactionIds, long expenseCategoryId)
        {
            try
            {
                var expenseCategory = _repositories.ExpenseCategory.FindById(expenseCategoryId);

                if (expenseCategory == null)
                    return new ServiceResult
                    {
                        Exception = new ArgumentException($"Invalid Argument {nameof(expenseCategoryId)}")
                    };


                foreach (var transactionId in transactionIds)
                {
                    var transaction = _repositories.Transaction.FindById(transactionId);
                    if (transaction == null)
                        return new ServiceResult
                        {
                            Exception = new ArgumentException($"Invalid Argument {nameof(transactionId)}")
                        };

                    transaction.CategoryId = expenseCategoryId;
                    _dataContext.SaveChanges();

                }

                return new ServiceResult
                {
                    Message = "Transactions successfully updated",
                    Status = ServiceStatus.Success
                };

            }
            catch (Exception e)
            {
                return new ServiceResult
                {
                    Exception = e
                };
            }
        }
    }
}
