using ETS.Domain.Enums;

namespace ETS.Domain
{
    public class Transaction:BaseEntity
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public UserDetail PaidBy { get; set; }
        public UserDetail PaidFor { get; set; }
        public TransactionFrequency Frequency { get; set; }
        public string FrequencyString { get { return Frequency.ToString(); } private set { } }
        public ExpenseCategory Category { get; set; }
        public string Details { get; set; }

    }
}
