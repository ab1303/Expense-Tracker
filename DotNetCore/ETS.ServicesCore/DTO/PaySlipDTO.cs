using System;
using ETS.Domain.Enums;

namespace ETS.Services.DTO
{
    public class PaySlipDTO
    {
        public long Id { get; set; }
        public PaySlipFrequency Frequency { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal NetEarnings { get; set; }
        public decimal SuperAnnuation { get; set; }
    }
}
