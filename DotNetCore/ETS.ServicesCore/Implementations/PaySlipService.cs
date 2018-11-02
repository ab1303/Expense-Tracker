using System;
using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.Services.Interfaces;
using Microsoft.Extensions.Logging;
using ETS.Domain.Enums;
using ETS.DomainCore.Model;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Results;

namespace ETS.Services.Implementations
{
    public class PaySlipService : AbstractService<PaySlip>, IPaySlipService
    {
        private readonly ILogger _logger;
        private readonly IDataContext _dataContext;
        private readonly IRepositories _repositories;

        public PaySlipService(IDataContext dataContext, IRepositories repositories, ILoggerFactory loggerFactory)
            : base(repositories.PaySlip)
        {
            _logger = loggerFactory.CreateLogger<ExpenseCategory>();
            _dataContext = dataContext;
            _repositories = repositories;
        }

      
        public ServiceResult<long> AddPaySlip(DateTime startDate, DateTime endDate, PaySlipFrequency frequency,
            decimal totalEarnings, decimal netEarnings, decimal superAnnuation)
        {
            try
            {
                PaySlip paySlip;
                if (frequency == PaySlipFrequency.Monthly)
                    paySlip = new MonthlyPaySlip
                    {
                        StartDate = startDate,
                        EndDate = endDate,
                        DateCreated = DateTime.UtcNow,
                        NetEarnings = netEarnings,
                        TotalEarnings = totalEarnings,
                        SuperAnnuation = superAnnuation,
                    };
                else 
                {
                    paySlip = new FortnightlyPaySlip
                    {
                        StartDate = startDate,
                        EndDate = endDate,
                        DateCreated = DateTime.UtcNow,
                        NetEarnings = netEarnings,
                        TotalEarnings = totalEarnings,
                        SuperAnnuation = superAnnuation,
                    };
                }

                _repositories.PaySlip.Insert(paySlip);

                _dataContext.SaveChanges();

                return new ServiceResult<long>
                {
                    Status = ServiceStatus.Success,
                    Model = paySlip.Id
                };

            }
            catch (Exception ex)
            {
                return new ServiceResult<long>
                {
                    Exception = ex
                };
            }

        }


        public ServiceResult DeletePaySlip(long paySlipId)
        {
            try
            {
                var paySlip = _repositories.PaySlip.FindById(paySlipId);

                if (paySlip == null)
                    return new ServiceResult
                    {
                        Exception = new ArgumentException($"Invalid Argument {nameof(paySlipId)}"),
                    };

                _repositories.PaySlip.Delete(paySlip);
                _dataContext.SaveChanges();

                return new ServiceResult
                {
                    Status = ServiceStatus.Success,
                };

            }
            catch (Exception ex)
            {
                return new ServiceResult
                {
                    Exception = ex
                };
            }

        }
    }
}
