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
        public PagedListArgs PagedListArgs { get; }
        public bool ReturnAllResults { get; }

        public ExpenseCategoryStatementQuery(bool returnAllResults = true)
        {
            ReturnAllResults = returnAllResults;
        }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {

            var query = from c in repositories.ExpenseCategory.Get()
                        join i in repositories.IndividualExpense.Get()
                        on c equals i.Category
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
                            DateCreated = i.DateCreated,
                            Amount = i.Amount
                        }
                        into tempResult
                        group tempResult by tempResult.CategoryName into groupedCategory
                        select new Result
                        {
                            Id = groupedCategory.,
                            FirstName = u.FirstName,
                            LastName = u.LastName,
                            GroupId = ug.Id,
                            GroupName = ug.Name,
                            DateCreated = u.DateCreated
                        };

            totalFound = query.Count();

            var orderBy = $"{DefaultSortBy.DateCreated} {"DESC"}";

            var results = ReturnAllResults ? query.OrderBy(orderBy).ToArray() :
                query.OrderBy(orderBy).Skip(PagedListArgs.PageSize * PagedListArgs.PageNumber).Take(PagedListArgs.PageSize).ToArray();

            return results;

        }

        public class Result
        {
            public long Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public long GroupId { get; set; }
            public string GroupName { get; set; }
            public DateTime DateCreated { get; set; }
        }

        public static class DefaultSortBy
        {
            public const string DateCreated = "DateCreated";
        }
    }
}
