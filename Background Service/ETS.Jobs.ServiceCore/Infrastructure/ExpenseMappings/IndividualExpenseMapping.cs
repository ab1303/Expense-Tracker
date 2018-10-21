using ETS.Domain;
using ETS.DomainCore.Enums;
using ETS.Services.Repositories;
using System;
using System.Linq;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Jobs.ServiceCore
{
    public class IndividualExpenseMapping : BaseExpenseMapping<IndividualExpense>
    {
        private IndividualExpenseMapping(IRepositories repositories, MonthlyExpenseFileImport importRecord) 
            : base(repositories, importRecord)
        {
            
        }

        public static IndividualExpense Create(IRepositories repositories, MonthlyExpenseFileImport importRecord)
        {
            return new IndividualExpenseMapping(repositories, importRecord)
                .MapExpenseCategory(importRecord.ExpenseCategory)
                .MapExpenseFrequency(importRecord.Frequency)
                .MapPaidBy(importRecord.PaidBy)
                .MapPaidFor(importRecord.PaidFor)
                .Build()
                ;
        }

        public override IExpenseMapping<IndividualExpense> MapPaidFor(string paidFor)
        {

            var paidForFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.PaidForIndividual &&
                    f.SourceValue == paidFor
                );

            if (paidForFieldMapping == null) throw new ArgumentException($"{nameof(paidFor)}");

            PaidFor = paidForFieldMapping.DestinationValue;
            return this;
        }

        public override IndividualExpense Build()
        {

            var paidBy = Repositories.UserDetail.Get().Single(ud => ud.FirstName == PaidBy);
            var paidFor = Repositories.UserDetail.Get().Single(ud => ud.FirstName == PaidFor);
            var category = Repositories.ExpenseCategory.Get().Single(c => c.Name == Category);

            var individualExpense = new IndividualExpense
            {
                Name = ExpenseName,
                Amount = Amount,
                Details = Details,
                Frequency = Frequency,
                TransactionDate = Date,
                DateCreated = DateTime.UtcNow,
                PaidById = paidBy.Id,
                PaidForId = paidFor.Id,
                CategoryId = category.Id,
            };

            return individualExpense;
        }

    }


}
