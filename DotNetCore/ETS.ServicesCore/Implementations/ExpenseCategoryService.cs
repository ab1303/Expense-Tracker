using System;
using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.DTO;
using ETS.Services.Interfaces;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Results;

namespace ETS.Services.Implementations
{
    public class ExpenseCategoryService : AbstractService<ExpenseCategory>, IExpenseCategoryService
    {
        private readonly ILogger _logger;
        private readonly IDataContext _dataContext;
        private readonly IRepositories _repositories;

        public ExpenseCategoryService(IDataContext dataContext, IRepositories repositories, ILoggerFactory loggerFactory)
            : base(repositories.ExpenseCategory)
        {
            _logger = loggerFactory.CreateLogger<ExpenseCategory>();
            _dataContext = dataContext;
            _repositories = repositories;
        }

        public List<ExpenseCategoryDTO> GetExpenseCategories()
        {
            return _repositories.ExpenseCategory.Get()
                  .Select(c => new ExpenseCategoryDTO
                  {
                      Id = c.Id,
                      Name = c.Name,
                      Description = c.Description
                  }).ToList();
        }

        public ServiceResult<long> AddExpenseCategory(string name, string description)
        {
            try
            {
                var expenseCategory = new ExpenseCategory
                {
                    Name = name,
                    Description = description
                };

                _repositories.ExpenseCategory.Insert(expenseCategory);

                _dataContext.SaveChanges();

                return new ServiceResult<long>
                {
                    Status = ServiceStatus.Success,
                    Model = expenseCategory.Id
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
    }
}
