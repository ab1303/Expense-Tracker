using ETS.Core.Helpers;
using ETS.Domain;
using ETS.Domain.Enums;
using ETS.DomainCore.Enums;
using ETS.Services.Repositories;
using System;
using System.Linq;

namespace ETS.Jobs.ServiceCore
{
    public class GroupExpenseMapping
    {
        private readonly IRepositories Repositories;

        private string expenseCategory;
        private string paidFor;
        private string paidBy;
        private string details;
        private ExpenseFrequency expenseFrequency;
        private decimal Amount;
        private string expenseName;
        private DateTime date;

        private GroupExpenseMapping(IRepositories repositories, MonthlyExpenseFileImport importRecord)
        {
            Repositories = repositories;

            Amount = importRecord.Amount;
            expenseName = importRecord.ExpenseItem;
            details = importRecord.Details;
        }

        public static IndividualExpense Create(IRepositories repositories, MonthlyExpenseFileImport importRecord)
        {
            return new GroupExpenseMapping(repositories, importRecord)
                .MapExpenseCategory(importRecord.ExpenseCategory)
                .MapExpenseFrequency(importRecord.Frequency)
                .MapPaidBy(importRecord.PaidBy)
                .MapPaidFor(importRecord.PaidFor)
                .Build()
                ;
        }

        public IndividualExpense Build()
        {

            var paidBy = Repositories.UserDetail.Get().Single(ud => ud.FirstName == this.paidBy);
            var paidFor = Repositories.UserDetail.Get().Single(ud => ud.FirstName == this.paidFor);
            var category = Repositories.ExpenseCategory.Get().Single(c => c.Name == expenseCategory);

            var individualExpense = new IndividualExpense
            {
                Amount = Amount,
                PaidBy = paidBy,
                PaidFor = paidFor,
                Name = expenseName,
                Category = category,
                Details = details,
                Frequency = expenseFrequency,
            };

            return individualExpense;
        }

        private GroupExpenseMapping MapPaidBy(string paidBy)
        {

            var paidByFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.PaidByIndividual &&
                    f.SourceValue == paidFor
                );

            if (paidByFieldMapping == null) throw new ArgumentException($"{nameof(paidFor)}");

            paidBy = paidByFieldMapping.DestinationValue;
            return this;
        }

        private GroupExpenseMapping MapPaidFor(string paidFor)
        {

            var paidForFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.PaidForIndividual &&
                    f.SourceValue == paidFor
                );

            if (paidForFieldMapping == null) throw new ArgumentException($"{nameof(paidFor)}");

            paidFor = paidForFieldMapping.DestinationValue;
            return this;
        }

        private GroupExpenseMapping MapExpenseCategory(string category)
        {
            var expenseCategoryFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.ExpenseCategory &&
                    f.SourceValue == category
                );

            if (expenseCategoryFieldMapping == null) throw new ArgumentException($"{nameof(category)}");

            expenseCategory = expenseCategoryFieldMapping.DestinationValue;

            return this;
        }

        private GroupExpenseMapping MapExpenseFrequency(string expenseFrequency)
        {

            if (string.IsNullOrEmpty(expenseFrequency) || string.IsNullOrWhiteSpace(expenseFrequency)) throw new ArgumentException($"{nameof(ExpenseFrequency)}");

            var expenseFrequencyEnum = expenseFrequency.ToEnum<ExpenseFrequency>();

            if (!expenseFrequencyEnum.HasValue) throw new ArgumentException($"{nameof(ExpenseFrequency)}");

            this.expenseFrequency = expenseFrequencyEnum.Value;

            return this;
        }
    }


}
