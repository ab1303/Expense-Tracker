using System;
using ETS.Domain.Enums;

namespace Angular_ASPNETCore_ExpenseTracker.Models.PaySlip
{
    public class PaySlipInput
    {
        public PaySlipFrequency Frequency { get; set; }
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal NetPay { get; set; }
        public decimal SuperAnnuation { get; set; }
    }
}
