using ETS.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ETS.DataCore.Implementations;

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
            if (!await dataContext.ExpenseCategories.AnyAsync())
            {
                await InsertExpenseCategoriesSampleData(dataContext);
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
                    Name="Zakat",
                    Description="Islamic zakat of 2.5% on assets on whom a year has passed",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new ExpenseCategory
                {
                    Name="Groceries",
                    Description="Daily groceries dugin month such as vegetables, meat etc",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new ExpenseCategory
                {
                    Name="Eating Out",
                    Description="This includes indulgence eating out individually or with family; sweets such as donuts etc",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                new ExpenseCategory
                {
                    Name="Shopping",
                    Description="Clothing for daily use.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                new ExpenseCategory
                {
                    Name="Home Rent",
                    Description="This includes fortnightly rent to rental agency.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                 new ExpenseCategory
                {
                    Name="Utilities",
                    Description="This includes utility bills for mobile, electricity, water etc.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new ExpenseCategory
                {
                    Name="Education",
                    Description="This mainly includes online learning and education. fee for certifications such as PMP etc.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new ExpenseCategory
                {
                    Name="Transport",
                    Description="This includes expense on car and regular commute expense.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                    new ExpenseCategory
                {
                    Name="Health",
                    Description="This includes expense on health, pharmacy and tests or medical expenses not covered.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                     new ExpenseCategory
                {
                    Name="Obligation",
                    Description="This includes monthly transfers back home and other related expenses.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },

                     new ExpenseCategory
                {
                    Name="Home",
                    Description="This includes expenses on household items such as furniture etc.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new ExpenseCategory
                {
                    Name="Investment",
                    Description="This includes different investments for the sake of profit, both short and long term.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new ExpenseCategory
                {
                    Name="Uncategorised",
                    Description="This includes different expenses which could not be categorised at that time.",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },

            };

            return expenseCategories;

        }
    }
}
