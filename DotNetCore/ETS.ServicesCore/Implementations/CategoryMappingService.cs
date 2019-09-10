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
using System;

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

        public ServiceResult<long> AddCategoryMappings(FieldCategory fieldCategory, string source, string target)
        {
            try
            {
                var categoryMapping = new FieldCategoryMapping
                {
                    SourceValue = source,
                    DestinationValue = target,
                    FieldCategory = fieldCategory,
                };

                _repositories.FieldCategoryMapping.Insert(categoryMapping);

                _dataContext.SaveChanges();

                return new ServiceResult<long>
                {
                    Status = ServiceStatus.Success,
                    Result = categoryMapping.Id
                };

            }
            catch (Exception ex)
            {
                return new ServiceResult<long>
                {
                    Exception = ex
                };
            }
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

        public ServiceResult RemoveCategoryMappings(long categoryMappingId)
        {
            try
            {
                _repositories.FieldCategoryMapping.DeleteWhere(m => m.Id == categoryMappingId);
                _dataContext.SaveChanges();

                return new ServiceResult
                {
                    Status = ServiceStatus.Success,
                };

            }
            catch (Exception ex)
            {
                return new ServiceResult
                {
                    Exception = ex
                };
            }
        }
    }
}
