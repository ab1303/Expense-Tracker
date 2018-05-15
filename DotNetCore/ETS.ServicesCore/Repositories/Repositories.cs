using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class Repositories : IRepositories
    {
        public IExpenseCategoryRepository ExpenseCategoryRepository { get; set; }

        public Repositories(IExpenseCategoryRepository expenseCategoryRepository)
        {
            ExpenseCategoryRepository = expenseCategoryRepository;
        }
    }
}
