using ETS.Core;
using System;

namespace ETS.Jobs.ServiceCore
{
    // When deserializing from excel.. property name of class must exactly match column headers in excel
    public class MonthlyExpenseFileImport : ExcelImportBase
    {
        public string ExpenseItem { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string PaidFor { get; set; }
        public string PaidBy{ get; set; }
        public string Frequency{ get; set; }
        public string ExpenseCategory{ get; set; }
        public string Details { get; set; }
    }
}
