using ETS.Services.Interfaces.Repositories;
using System;

namespace ETS.Services.Repositories
{
    public interface IRepositories
    {
        Lazy<IExpenseCategoryRepository> ExpenseCategory { get; set; }
    }
}
