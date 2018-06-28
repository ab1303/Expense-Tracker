using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.DomainCore.Model;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class IndividualExpenseRepository : AbstractRepository<IndividualExpense>, IIndividualExpenseRepository
    {
        public IndividualExpenseRepository(IDataContext context) : base(context)
        {
        }
    }
}
