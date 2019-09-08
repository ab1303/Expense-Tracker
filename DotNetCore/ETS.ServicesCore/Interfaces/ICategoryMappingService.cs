using ETS.DomainCore.Enums;
using ETS.Services.DTO;
using ETS.Services.Results;
using System.Collections.Generic;

namespace ETS.Services.Interfaces
{
    public interface ICategoryMappingService
    {
        ServiceResult<IEnumerable<CategoryMappingDTO>> GetCategoryMappings(FieldCategory fieldCategory);
      
    }
}
