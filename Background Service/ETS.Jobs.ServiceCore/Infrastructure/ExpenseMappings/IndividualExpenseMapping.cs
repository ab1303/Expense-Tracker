using ETS.Domain;
using ETS.Services.Repositories;
using System.Linq;

namespace ETS.Jobs.ServiceCore
{
    public class IndividualExpenseMapping : BaseExpenseMapping<IndividualExpense>
    {
        private IndividualExpenseMapping(IRepositories repositories, MonthlyExpenseFileImport importRecord) : base(repositories, importRecord)
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

        public override IndividualExpense Build()
        {

            var paidBy = Repositories.UserDetail.Get().Single(ud => ud.FirstName == PaidBy);
            var paidFor = Repositories.UserDetail.Get().Single(ud => ud.FirstName == PaidFor);
            var category = Repositories.ExpenseCategory.Get().Single(c => c.Name == Category);

            var individualExpense = new IndividualExpense
            {
                Amount = Amount,
                PaidBy = paidBy,
                PaidFor = paidFor,
                Name = ExpenseName,
                Category = category,
                Details = Details,
                Frequency = Frequency,
            };

            return individualExpense;
        }

    }


}
