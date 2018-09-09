using ETS.Services.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using ETS.Services.Results;

namespace ETS.Services.Interfaces
{
    public interface ITransactionService
    {
        ServiceResult UpdateTransactions(long[] transactionIds, long expenseCategoryId);
    }
}
