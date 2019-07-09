using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using ETS.Domain.Enums;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Queries.Income
{
    public class PaySlipsQuery : IPagedQuery<PaySlipsQuery.Result>
    {
        public static class DefaultSortBy
        {
            public const string StartDate = "PeriodStart";
        }

        public class Result
        {
            public long Id { get; set; }
            public PaySlipFrequency Frequency { get; set; }
            public DateTime PeriodStart { get; set; }
            public DateTime PeriodEnd { get; set; }
            public decimal TotalEarnings { get; set; }
            public decimal NetPay { get; set; }
            public decimal SuperAnnuation { get; set; }
        }

        private NgxDataTableArgs _pagedListArgs;

        public IPagedQuery<Result> SetPage(NgxDataTableArgs pageInfo)
        {
            _pagedListArgs = new NgxDataTableArgs
            {
                PageNumber = pageInfo.PageNumber,
                PageSize = pageInfo.PageSize,
            };

            return this;
        }

        public bool ReturnAllResults { get; set; }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {
            var query = repositories.PaySlip
                .Get()
                .Select(p => new Result
                {
                    Id = p.Id,
                    TotalEarnings = p.TotalEarnings,
                    Frequency = p.Frequency,
                    SuperAnnuation = p.SuperAnnuation,
                    NetPay = p.NetEarnings,
                    PeriodEnd = p.EndDate.UtcDateTime,
                    PeriodStart = p.StartDate.UtcDateTime
                });

            totalFound = query.Count();

            var orderBy = $"{DefaultSortBy.StartDate} DESC";

            var results = ReturnAllResults
                ? query.OrderBy(orderBy).ToArray()
                : query.OrderBy(orderBy)
                .Skip(_pagedListArgs.PageSize * _pagedListArgs.PageNumber)
                .Take(_pagedListArgs.PageSize).ToArray();


            return results;
        }
    }
}
