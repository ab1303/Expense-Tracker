using ETS.Services.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using ETS.Services.Results;

namespace ETS.Services.Interfaces
{
    public interface IExpenseCategoryService
    {
        List<ExpenseCategoryDTO> GetExpenseCategories();
        ServiceResult<long> AddExpenseCategory(string name, string description);
        ServiceResult UpdateExpenseCategory(long id, string name, string description);
        ServiceResult DeleteExpenseCategory(long id);
    }
}
