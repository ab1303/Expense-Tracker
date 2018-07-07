using ETS.Domain.Enums;
using ETS.DomainCore.Model;
using System;

namespace ETS.Domain
{
    public abstract class Transaction:BaseEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }

        public long PaidById { get; set; }
        public virtual UserDetail PaidBy { get; set; }

        public ExpenseFrequency Frequency { get; set; }
        public string FrequencyString { get { return Frequency.ToString(); } private set { } }

        public long CategoryId { get; set; }
        public virtual ExpenseCategory Category { get; set; }

        public string Details { get; set; }
        public DateTime TransactionDate { get; set; }

    }

    public class IndividualExpense : Transaction
    {
        public long PaidForId { get; set; }
        public virtual UserDetail PaidFor { get; set; }
    }

    public class GroupExpense : Transaction
    {
        public long PaidForId { get; set; }
        public virtual UserGroup PaidFor { get; set; }
    }

}
