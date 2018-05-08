using ETS.Services.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace ETS.Services.Interfaces
{
    public interface IExpenseCategoryService
    {
        List<ExpenseCategoryDTO> GetExpenseCategories();
    }
}
