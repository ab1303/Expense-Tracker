using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ExpenseRegister
{
    public class BulkUpdateModel
    {
        public IEnumerable<long> TransactionIds { get; set; }
        public long ExpenseCategoryId { get; set; }
    }
}
