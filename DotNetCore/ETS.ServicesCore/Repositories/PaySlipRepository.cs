using ETS.DataCore.Intefaces;
using ETS.DomainCore.Model;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class PaySlipRepository : AbstractRepository<PaySlip>, IPaySlipRepository
    {
        public PaySlipRepository(IDataContext context) : base(context)
        {
        }
    }
}
