using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class TransactionRepository : AbstractRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(IDataContext context) : base(context)
        {
        }
    }
}
