using System;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class Repositories : IRepositories
    {
        public Lazy<IExpenseCategoryRepository> ExpenseCategory { get; set; }
    }
}
