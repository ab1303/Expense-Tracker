using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class UserDetailRepository : AbstractRepository<UserDetail>, IUserDetailRepository
    {
        public UserDetailRepository(IDataContext context) : base(context)
        {
        }
    }
}
