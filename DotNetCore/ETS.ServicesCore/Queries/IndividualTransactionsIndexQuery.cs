using ETS.Domain.Enums;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.Repositories;
using System;
using System.Linq;
using System.Linq.Dynamic;
using System.Collections.Generic;

namespace ETS.Services.Queries
{
    public class IndividualTransactionsIndexQuery : IPagedQuery<IndividualTransactionsIndexQuery.Result>
    {
        public PagedListArgs PagedListArgs { get; }
        public bool ReturnAllResults { get; }

        public IndividualTransactionsIndexQuery(bool returnAllResults = true)
        {
            ReturnAllResults = returnAllResults;
        }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {


            var query = from t in repositories.IndividualExpense.Get()
                        join c in repositories.ExpenseCategory.Get()
                        on t.Category equals c
                        join paidBy in repositories.UserDetail.Get()
                        on t.PaidBy equals paidBy
                        join paidFor in repositories.UserDetail.Get()
                        on t.PaidFor equals paidFor
                        select new Result
                        {
                            Id = t.Id,
                            Name = t.Name,
                            Amount = t.Amount,
                            CategoryName = c.Name,
                            Details = t.Details,
                            PaidByName = paidBy.FirstName + " " + paidBy.LastName,
                            PaidForName = paidFor.FirstName + " " + paidFor.LastName,
                            TransactionDate = t.TransactionDate,
                            Frequency = t.Frequency
                        };

            totalFound = query.Count();

            var orderBy = $"{DefaultSortBy.TransactionDate} {"DESC"}";

            var results = ReturnAllResults ? query.OrderBy(orderBy).ToArray() :
                query.OrderBy(orderBy).Skip(PagedListArgs.PageSize * PagedListArgs.PageNumber).Take(PagedListArgs.PageSize).ToArray();

            return results;

        }

        public class Result
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public decimal Amount { get; set; }
            public string CategoryName { get; set; }
            public string Details { get; set; }
            public string PaidByName { get; set; }
            public string PaidForName { get; set; }
            public DateTime TransactionDate { get; set; }
            public ExpenseFrequency Frequency { get; set; }
        }

        public static class DefaultSortBy
        {
            public const string TransactionDate = "TransactionDate";
        }
    }
}
