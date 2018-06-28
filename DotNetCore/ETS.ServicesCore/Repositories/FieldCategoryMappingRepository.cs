using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.DomainCore.Model;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class FieldCategoryMappingRepository : AbstractRepository<FieldCategoryMapping>, IFieldCategoryMappingRepository
    {
        public FieldCategoryMappingRepository(IDataContext context) : base(context)
        {
        }
    }
}
