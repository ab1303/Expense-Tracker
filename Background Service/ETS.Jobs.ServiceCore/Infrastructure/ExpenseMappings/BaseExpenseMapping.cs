using ETS.Services.Repositories;
using System;
using System.Linq;
using ETS.DomainCore.Enums;
using ETS.Core.Helpers;
using ETS.Domain.Enums;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Jobs.ServiceCore
{
    public interface IExpenseMapping<T>
    {
        IExpenseMapping<T> MapPaidBy(string paidBy);
        IExpenseMapping<T> MapPaidFor(string paidFor);
        IExpenseMapping<T> MapExpenseCategory(string category);
        IExpenseMapping<T> MapExpenseFrequency(string frequency);
        T Build();
    }


    public abstract class BaseExpenseMapping<T>: IExpenseMapping<T>
    {
        protected readonly IRepositories Repositories;

        protected string PaidBy;
        protected string PaidFor;
        protected string Category;
        protected ExpenseFrequency Frequency;

        protected decimal Amount;
        protected string ExpenseName;
        protected DateTime Date;
        protected string Details;
      
        protected BaseExpenseMapping(IRepositories repositories, MonthlyExpenseFileImport importRecord)
        {
            Repositories = repositories;

            Date = importRecord.Date;
            Amount = importRecord.Amount;
            ExpenseName = importRecord.ExpenseItem;
            Details = importRecord.Details;
        }

        public IExpenseMapping<T> MapPaidBy(string paidBy)
        {

            var paidByFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.PaidByIndividual &&
                    f.SourceValue == paidBy
                );

            if (paidByFieldMapping == null) throw new ArgumentException($"{nameof(paidBy)}");

            PaidBy = paidByFieldMapping.DestinationValue;
            return this;
        }

      
        public IExpenseMapping<T> MapExpenseCategory(string category)
        {
            var expenseCategoryFieldMapping =
                Repositories.FieldCategoryMapping.Get()
                .SingleOrDefault(f => f.FieldCategory == FieldCategory.ExpenseCategory &&
                    f.SourceValue == category
                );

            if (expenseCategoryFieldMapping == null) throw new ArgumentException($"{nameof(category)}");

            Category = expenseCategoryFieldMapping.DestinationValue;

            return this;
        }

   
        public IExpenseMapping<T> MapExpenseFrequency(string expenseFrequency)
        {

            if (string.IsNullOrEmpty(expenseFrequency) || string.IsNullOrWhiteSpace(expenseFrequency)) throw new ArgumentException($"{nameof(ExpenseFrequency)}");

            var expenseFrequencyEnum = expenseFrequency.Replace(" ","").ToEnum<ExpenseFrequency>();

            if (!expenseFrequencyEnum.HasValue) throw new ArgumentException($"{nameof(ExpenseFrequency)}");

            Frequency = expenseFrequencyEnum.Value;

            return this;
        }

        public abstract T Build();
        public abstract IExpenseMapping<T> MapPaidFor(string paidFor);



    }
}
