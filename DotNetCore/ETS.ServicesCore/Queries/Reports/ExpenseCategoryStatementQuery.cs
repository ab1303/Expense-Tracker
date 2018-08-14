using ETS.Domain.Enums;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.Repositories;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;

namespace ETS.Services.Queries
{
    public class ExpenseCategoryStatementQuery : IPagedQuery<ExpenseCategoryStatementQuery.Result>
    {

        public class Result
        {
            public long Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public long GroupId { get; set; }
            public string GroupName { get; set; }
            public long CategoryId { get; set; }
            public string CategoryName { get; set; }
            public DateTime TransactionDate { get; set; }
            public decimal Amount { get; set; }
        }

        public PagedListArgs PagedListArgs { get; }
        public bool ReturnAllResults { get; }

        public ExpenseCategoryStatementQuery(bool returnAllResults = true)
        {
            ReturnAllResults = returnAllResults;
        }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {

            var query = (from i in repositories.IndividualExpense.Get()
                         join c in repositories.ExpenseCategory.Get()
                         on i.Category equals c
                         join u in repositories.UserDetail.Get()
                         on i.PaidFor equals u
                         join ug in repositories.UserGroup.Get()
                         on u.UserGroupId equals ug.Id
                         select new
                         {
                             UserId = u.Id,
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             GroupId = ug.Id,
                             GroupName = ug.Name,
                             CategoryId = c.Id,
                             CategoryName = c.Name,
                             Id = i.Id,
                             TransactionDate = i.TransactionDate,
                             Amount = i.Amount
                         }
                        into tempResult
                         group tempResult by
                         new
                         {
                             tempResult.UserId,
                             tempResult.FirstName,
                             tempResult.LastName,
                             tempResult.GroupId,
                             tempResult.GroupName,
                             tempResult.CategoryId,
                             tempResult.CategoryName,
                             tempResult.Id,
                             tempResult.TransactionDate,
                         } into groupedCategory
                         select new Result
                         {
                             Id = groupedCategory.Key.Id,
                             FirstName = groupedCategory.Key.FirstName,
                             LastName = groupedCategory.Key.LastName,
                             CategoryId = groupedCategory.Key.CategoryId,
                             CategoryName = groupedCategory.Key.CategoryName,
                             GroupId = groupedCategory.Key.GroupId,
                             GroupName = groupedCategory.Key.GroupName,
                             TransactionDate = groupedCategory.Key.TransactionDate,
                             Amount = groupedCategory.Sum(g => g.Amount),
                         }).AsQueryable();

            totalFound = query.Count();

            var orderBy = $"{DefaultSortBy.CategoryName} {"DESC"}";

            //var results = ReturnAllResults ? query.OrderBy(orderBy).ToArray() :
            //    query.OrderBy(orderBy).Skip(PagedListArgs.PageSize * PagedListArgs.PageNumber).Take(PagedListArgs.PageSize).ToArray();

            //return results;

            return query.OrderBy(orderBy).ToArray();
        }



        public static class DefaultSortBy
        {
            public const string CategoryName = "CategoryName";
        }
    }
}
