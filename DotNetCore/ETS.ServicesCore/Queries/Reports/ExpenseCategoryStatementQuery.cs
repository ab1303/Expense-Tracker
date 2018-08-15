﻿using ETS.Domain.Enums;
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
                         group new { i, c, u, ug } by new
                         {
                             GroupId = ug.Id,
                             GroupName = ug.Name,
                             CategoryId = c.Id,
                             CategoryName = c.Name,
                             u.Id,
                             u.FirstName,
                             u.LastName,
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
                             Amount = groupedCategory.Sum(g => g.i.Amount),
                         }).AsQueryable();




            totalFound = query.Count();
            var result = query.ToArray();

            return result;
        }



        public static class DefaultSortBy
        {
            public const string CategoryName = "CategoryName";
        }
    }
}
