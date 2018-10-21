using System;
using ETS.Domain.Enums;

namespace Angular_ASPNETCore_ExpenseTracker.Models.PaySlip
{
    public class PaySlipInput
    {
        public PaySlipFrequency Frequency { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal NetEarnings { get; set; }
        public decimal SuperAnnuation { get; set; }
    }
}
