using System;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class Repositories : IRepositories
    {
        public IExpenseCategoryRepository ExpenseCategory { get; set; }

        public Repositories(IExpenseCategoryRepository expenseCategoryRepository)
        {
            ExpenseCategory = expenseCategoryRepository;
        }
    }
}
