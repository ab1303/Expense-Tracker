using ETS.DataCore.Intefaces;
using ETS.DomainCore.Enums;
using ETS.DomainCore.Model;
using ETS.Services.DTO;
using ETS.Services.Interfaces;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Results;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections.Generic;

namespace ETS.Services.Implementations
{
    public class CategoryMappingService : AbstractService<FieldCategoryMapping>, ICategoryMappingService
    {
        private readonly ILogger _logger;
        private readonly IDataContext _dataContext;
        private readonly IRepositories _repositories;

        public CategoryMappingService(IDataContext dataContext, IRepositories repositories, ILoggerFactory loggerFactory) : base(repositories.FieldCategoryMapping)
        {
            _logger = loggerFactory.CreateLogger<FieldCategoryMapping>();
            _dataContext = dataContext;
            _repositories = repositories;
        }

        public ServiceResult<IEnumerable<CategoryMappingDTO>> GetCategoryMappings(FieldCategory fieldCategory)
        {
            return new ServiceResult<IEnumerable<CategoryMappingDTO>>
            {
                Result = _repositories.FieldCategoryMapping.Get()
                .Where(fc => fc.FieldCategory == fieldCategory)
               .Select(c => new CategoryMappingDTO
               {
                   Id = c.Id,
                   SourceValue = c.SourceValue,
                   DestinationValue = c.DestinationValue
               }).ToList()
            };
        }
    }
}
