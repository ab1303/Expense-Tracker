using System;
using ETS.Domain.Enums;
using ETS.Services.Results;

namespace ETS.Services.Interfaces
{
    public interface IPaySlipService
    {
        ServiceResult<long> AddPaySlip(DateTime startDate, DateTime endDate, PaySlipFrequency frequency, 
            decimal totalEarnings, decimal netEarnings, decimal superAnnuation);

        ServiceResult UpdatePaySlip(long paySlipId, DateTime startDate, DateTime endDate, PaySlipFrequency frequency,
            decimal totalEarnings, decimal netEarnings, decimal superAnnuation);

        ServiceResult DeletePaySlip(long paySlipId);
    }
}
