using ETS.Domain.Enums;
using ETS.DomainCore.Model;

namespace ETS.Domain
{
    public abstract class Transaction:BaseEntity
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public UserDetail PaidBy { get; set; }
        public TransactionFrequency Frequency { get; set; }
        public string FrequencyString { get { return Frequency.ToString(); } private set { } }
        public ExpenseCategory Category { get; set; }
        public string Details { get; set; }

    }

    public class IndividualExpense : Transaction
    {
        public UserDetail PaidFor { get; set; }
    }

    public class GroupExpense : Transaction
    {
        public UserGroup PaidFor { get; set; }
    }

}
