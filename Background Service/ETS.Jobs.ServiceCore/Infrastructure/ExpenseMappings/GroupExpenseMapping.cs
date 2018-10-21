using ETS.DataCore.Implementations;
using ETS.Domain;
using ETS.DomainCore.Enums;
using ETS.Services.Repositories;
using System;
using System.Linq;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Jobs.ServiceCore
{
    public class GroupExpenseMapping : BaseExpenseMapping<GroupExpense>
    {
        private GroupExpenseMapping(IRepositories repositories, MonthlyExpenseFileImport importRecord) 
            : base(repositories, importRecord)
        {

        }

        public static GroupExpense Create(IRepositories repositories, MonthlyExpenseFileImport importRecord)
        {
            return new GroupExpenseMapping(repositories, importRecord)
                .MapExpenseCategory(importRecord.ExpenseCategory)
                .MapExpenseFrequency(importRecord.Frequency)
                .MapPaidBy(importRecord.PaidBy)
                .MapPaidFor(importRecord.PaidFor)
                .Build()
                ;
        }

        public override IExpenseMapping<GroupExpense> MapPaidFor(string paidFor)
        {

            var paidForFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.PaidForGroup &&
                    f.SourceValue == paidFor
                );

            if (paidForFieldMapping == null) throw new ArgumentException($"{nameof(paidFor)}");

            PaidFor = paidForFieldMapping.DestinationValue;
            return this;
        }

        public override GroupExpense Build()
        {

            var paidBy = Repositories.UserDetail.Get().Single(ud => ud.FirstName == PaidBy);
            var paidFor = Repositories.UserGroup.Get().Single(ud => ud.Name == PaidFor);
            var category = Repositories.ExpenseCategory.Get().Single(c => c.Name == Category);

            var groupExpense = new GroupExpense
            {
                Amount = Amount,
                Name = ExpenseName,
                Details = Details,
                Frequency = Frequency,
                TransactionDate = Date,
                DateCreated = DateTime.UtcNow,
                PaidById = paidBy.Id,
                PaidForId = paidFor.Id,
                CategoryId = category.Id,
            };

            return groupExpense;
        }

    }


}
