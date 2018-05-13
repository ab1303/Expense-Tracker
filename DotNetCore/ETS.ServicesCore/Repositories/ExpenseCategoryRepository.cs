using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class ExpenseCategoryRepository : AbstractRepository<ExpenseCategory>, IExpenseCategoryRepository
    {
        public ExpenseCategoryRepository(IDataContext context) : base(context)
        {
        }
    }
}
