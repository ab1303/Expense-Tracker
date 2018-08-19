using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using ETS.Service.Services;
using ETS.Services.DTO;
using ETS.Services.DTO.Reports;
using ETS.Services.Interfaces;
using ETS.Services.Queries;

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

            var report2 = from g1 in expenseItems
                          group g1 by new { g1.CategoryId, g1.CategoryName }
                into s1
                          select new ReportGroupDTO
                          {

                              Category = new GroupedTotalDTO
                              {
                                  GroupingName = s1.Key.CategoryName,
                                  GroupingTotal = s1.Sum(t => t.Amount),
                              },
                              SubCategory = from g2 in s1
                                            group g2 by new { g2.CategoryId, g2.CategoryName, g2.GroupId, g2.GroupName }
                                  into s2
                                            select new ReportGroupDTO
                                            {
                                                Category = new GroupedTotalDTO
                                                {
                                                    GroupingName = s2.Key.GroupName,
                                                    GroupingTotal = s2.Sum(t2 => t2.Amount)
                                                },
                                                SubCategory = from g3 in s2
                                                              group g3 by new { g3.CategoryId, g3.CategoryName, g3.GroupId, g3.GroupName, g3.UserId, UserName = g3.FirstName + " " + g3.LastName }
                                                into s3
                                                              select new ReportGroupDTO
                                                              {
                                                                  Category = new GroupedTotalDTO
                                                                  {
                                                                      GroupingName = s3.Key.UserName,
                                                                      GroupingTotal = s3.Sum(t3 => t3.Amount)
                                                                  },
                                                              }
                                            }
                          };


            var report3 = from g3 in expenseItems
                          where g3.CategoryId == 4
                group g3 by new
                {
                    g3.CategoryId,
                    g3.CategoryName,
                    g3.GroupId,
                    g3.GroupName,
                    g3.UserId,
                    UserName = g3.FirstName + " " + g3.LastName
                }
                into s3
                select new ReportGroupDTO
                {
                    Category = new GroupedTotalDTO
                    {
                        GroupingName = s3.Key.UserName,
                        GroupingTotal = s3.Sum(t3 => t3.Amount)
                    },
                };

            var report = expenseItems.GroupBy(g => new { g.CategoryId, g.CategoryName })
                .Select(s => new ReportGroupDTO
                {
                    Category = new GroupedTotalDTO
                    {
                        GroupingName = s.Key.CategoryName,
                        GroupingTotal = s.Sum(t => t.Amount),
                    },
                    SubCategory = s.GroupBy(g2 => new { g2.CategoryId, g2.CategoryName, g2.GroupId, g2.GroupName })
                    .Select(s2 => new ReportGroupDTO
                    {
                        Category = new GroupedTotalDTO
                        {
                            GroupingName = s2.Key.GroupName,
                            GroupingTotal = s2.Sum(t2 => t2.Amount)
                        },
                        SubCategory = s.GroupBy(g3 => new { g3.CategoryId, g3.CategoryName, g3.GroupId, g3.GroupName, g3.UserId, UserName = g3.FirstName + " " + g3.LastName })
                                .Select(s3 => new ReportGroupDTO
                                {
                                    Category = new GroupedTotalDTO
                                    {
                                        GroupingName = s3.Key.UserName,
                                        GroupingTotal = s3.Sum(t3 => t3.Amount)
                                    },
                                })
                    })
                });

            return report.ToArray();

        }
    }
}
