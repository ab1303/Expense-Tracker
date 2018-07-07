using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using ETS.DataCore.Implementations;
using ETS.DomainCore.Model;
using ETS.DomainCore.Enums;

namespace ETS.DataCore.Seeders
{
    public class FieldMappingSeeder
    {
        readonly ILogger _Logger;

        public FieldMappingSeeder(ILoggerFactory loggerFactory)
        {
            _Logger = loggerFactory.CreateLogger("FieldMappingsDbSeederLogger");
        }

        public async Task SeedAsync(DataContext dataContext)
        {
            if (!await dataContext.FieldCategoryMappings.AnyAsync())
            {
                await InsertFieldMappingsSampleData(dataContext);
            }
        }

        public async Task InsertFieldMappingsSampleData(DataContext db)
        {
            var fieldCategoryMappings = GetFieldMappings();
            db.FieldCategoryMappings.AddRange(fieldCategoryMappings);
            try
            {
                int numAffected = await db.SaveChangesAsync();
                _Logger.LogInformation(@"Saved {numAffected} expenseCategories");
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(FieldMappingSeeder)}: " + exp.Message);
                throw;
            }

        }

        private List<FieldCategoryMapping> GetFieldMappings()
        {
            var fieldMappings = new List<FieldCategoryMapping>
            {
                // ExpenseCategory
                new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Zakat",
                    DestinationValue="Zakat",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                 new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Grocery",
                    DestinationValue="Groceries",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Indulgence",
                    DestinationValue="Eating Out",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                    new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Room Rental",
                    DestinationValue="Home Rent",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Room Rental",
                    DestinationValue="Home Rent",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                 new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Utility Bills",
                    DestinationValue="Utilities",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Oz Settling Exp.",
                    DestinationValue="Education",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Transport Exp",
                    DestinationValue="Transport",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Medical",
                    DestinationValue="Health",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                    new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Obligation",
                    DestinationValue="Obligation",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Household",
                    DestinationValue="Home",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Clothing",
                    DestinationValue="Shopping",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },

                // Paid for Mapping - Individual
                 new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForIndividual,
                    SourceValue="Self",
                    DestinationValue="Abdul",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForIndividual,
                    SourceValue="Wife",
                    DestinationValue="Aimen",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                   new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForIndividual,
                    SourceValue="Arish",
                    DestinationValue="Arish",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                     new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForIndividual,
                    SourceValue="Adaan",
                    DestinationValue="Adaan",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                 new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForIndividual,
                    SourceValue="Newborn",
                    DestinationValue="Adaan",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                 // Paid for Mapping - Group
                   new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForGroup,
                    SourceValue="Family",
                    DestinationValue="Sydney Home",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                       new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidForGroup,
                    SourceValue="Family Home",
                    DestinationValue="Lahore Home",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                // Paid by Mapping 
                  new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.PaidByIndividual,
                    SourceValue="Wahab",
                    DestinationValue="Abdul",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                  new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Food",
                    DestinationValue="Eating Out",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                    new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Investment",
                    DestinationValue="Investment",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },
                       new FieldCategoryMapping
                {
                    FieldCategory=FieldCategory.ExpenseCategory,
                    SourceValue="Misc.",
                    DestinationValue="Uncategorised",
                    CreateLogin="seeder@application.com",
                    DateCreated=DateTime.Now
                },

            };

            return fieldMappings;

        }
    }
}
