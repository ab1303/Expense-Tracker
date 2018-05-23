﻿using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.DTO;
using ETS.Services.Interfaces;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace ETS.Services.Implementations
{
    public class ExpenseCategoryService : AbstractService<ExpenseCategory>, IExpenseCategoryService
    {
        private readonly ILogger _logger;
        private readonly IDataContext _dataContex;
        private readonly IRepositories _repositories;

        public ExpenseCategoryService(IDataContext dataContex, IRepositories repositories, ILoggerFactory loggerFactory) 
            :base(repositories.ExpenseCategoryRepository)
        {
            _logger = loggerFactory.CreateLogger<ExpenseCategory>();
            _dataContex = dataContex;
            _repositories = repositories;
        }

        public List<ExpenseCategoryDTO> GetExpenseCategories()
        {
          return  _repositories.ExpenseCategoryRepository.Get()
                .Select(c => new ExpenseCategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description
                }).ToList();
        }

    }
}