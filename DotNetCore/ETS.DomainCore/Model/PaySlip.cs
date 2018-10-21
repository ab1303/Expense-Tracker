using System;
using ETS.Domain;
using ETS.Domain.Enums;

namespace ETS.DomainCore.Model
{
    public abstract class PaySlip : BaseEntity
    {
        public long Id { get; set; }
        public PaySlipFrequency Frequency { get; set; }
        public string FrequencyString { get { return Frequency.ToString(); } private set { } }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal NetEarnings { get; set; }
        public decimal SuperAnnuation { get; set; }
    }

    public class MonthlyPaySlip : PaySlip
    {
        public MonthlyPaySlip()
        {
            Frequency = PaySlipFrequency.Monthly;
        }

    }

    public class FortnightlyPaySlip : PaySlip
    {
        public FortnightlyPaySlip()
        {
            Frequency = PaySlipFrequency.Fortnightly;
        }

    }
}
