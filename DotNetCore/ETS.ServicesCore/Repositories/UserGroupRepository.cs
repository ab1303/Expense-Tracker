using ETS.DataCore.Intefaces;
using ETS.DomainCore.Model;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class UserGroupRepository : AbstractRepository<UserGroup>, IUserGroupRepository
    {
        public UserGroupRepository(IDataContext context) : base(context)
        {
        }
    }
}
