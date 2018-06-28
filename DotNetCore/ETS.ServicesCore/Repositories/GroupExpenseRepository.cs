using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class GroupExpenseRepository : AbstractRepository<GroupExpense>, IGroupExpenseRepository
    {
        public GroupExpenseRepository(IDataContext context) : base(context)
        {
        }
    }
}
