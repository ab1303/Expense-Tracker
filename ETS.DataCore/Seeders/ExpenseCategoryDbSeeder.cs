using ETS.Data;
using ETS.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace ETS.DataCore.Seeders
{
    public class ExpenseCategoryDbSeeder
    {
        readonly ILogger _Logger;

        public ExpenseCategoryDbSeeder(ILoggerFactory loggerFactory)
        {
            _Logger = loggerFactory.CreateLogger("ExpenseCategoriesDbSeederLogger");
        }

        public async Task SeedAsync(DataContext dataContext)
        {
            if (await dataContext.Database.EnsureCreatedAsync())
            {
                if (!await dataContext.ExpenseCategories.AnyAsync())
                {
                    await InsertExpenseCategoriesSampleData(dataContext);
                }
            }
        }

        public async Task InsertExpenseCategoriesSampleData(DataContext db)
        {
            var expenseCategories = GetExpenseCategories();
            db.ExpenseCategories.AddRange(expenseCategories);
            try
            {
                int numAffected = await db.SaveChangesAsync();
                _Logger.LogInformation(@"Saved {numAffected} expenseCategories");
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(ExpenseCategoryDbSeeder)}: " + exp.Message);
                throw;
            }

        }

        private List<ExpenseCategory> GetExpenseCategories()
        {
            var expenseCategories = new List<ExpenseCategory>
            {
                new ExpenseCategory
                {
                    Name="Clothing",
                    Description="Clothing for daily use"
                },
                new ExpenseCategory
                {
                    Name="Zakat",
                    Description="Islamic zakat of 2.5% on assets on whom a year has passed"
                }
            };

            return expenseCategories;

        }
    }
}
