using System.Collections.Generic;
using System.Linq;
using ETS.Service.Services;
using ETS.Services.DTO.Reports;
using ETS.Services.Interfaces;
using ETS.Services.Queries.Reports;

namespace ETS.Services.Implementations
{
    public class ReportingService : IReportingService
    {
        private readonly IQueryService _queryService;

        public ReportingService(IQueryService queryService)
        {
            _queryService = queryService;
        }

        public IEnumerable<ReportGroupDTO> ExpenseCategoryReport()
        {
            var expenseCategoryReportQuery = new ExpenseCategoryStatementQuery();
            var expenseItems = _queryService.Execute(expenseCategoryReportQuery, out int totalCount);


            var report =
                expenseItems.GroupBy(g => new { g.Year })
                    .Select(s0 => new ReportGroupDTO
                    {
                        Category = new GroupedTotalDTO
                        {
                            GroupingName = s0.Key.Year.ToString(),
                            GroupingTotal = s0.Sum(t => t.Amount),
                        },
                        SubCategories = s0.GroupBy(g => new { g.Year, g.CategoryId, g.CategoryName })
                        .Select(s => new ReportGroupDTO
                        {
                            Category = new GroupedTotalDTO
                            {
                                GroupingName = s.Key.CategoryName,
                                GroupingTotal = s.Sum(t => t.Amount),
                            },
                        })
                    });

            return report.ToArray();

        }
    }
}
