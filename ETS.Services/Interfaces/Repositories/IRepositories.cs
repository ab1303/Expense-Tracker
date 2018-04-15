using ETS.Services.Interfaces.Repositories;
using System;

namespace ETS.Services.Repositories
{
    public interface IRepositories
    {
        //IExpenseCategoryRepository ExpenseCategory { get; set; }
        IExpenseCategoryRepository ExpenseCategory { get; }
    }
}
