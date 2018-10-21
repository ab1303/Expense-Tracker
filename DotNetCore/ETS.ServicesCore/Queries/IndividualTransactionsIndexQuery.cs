using ETS.Domain.Enums;
using ETS.Service.DTO;
using ETS.Service.Services;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Queries
{
    public class IndividualTransactionsIndexQuery : IPagedQuery<IndividualTransactionsIndexQuery.Result>
    {
        private readonly long? _expenseCategoryId;

        private NgxDataTableArgs _pagedListArgs;
        public bool ReturnAllResults { get; set; }

        public IndividualTransactionsIndexQuery(long? expenseCategoryId)
        {
            _expenseCategoryId = expenseCategoryId;
            ReturnAllResults = false;
            _pagedListArgs = new NgxDataTableArgs();
        }

        public IPagedQuery<Result> SetPage(NgxDataTableArgs pageInfo)
        {
            _pagedListArgs = new NgxDataTableArgs
            {
                PageNumber = pageInfo.PageNumber,
                PageSize = pageInfo.PageSize,
            };

            return this;
        }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {


            var individualExpenses = from t in repositories.IndividualExpense.Get()
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
                            CategoryId = c.Id,
                            CategoryName = c.Name,
                            Details = t.Details,
                            PaidByName = paidBy.FirstName + " " + paidBy.LastName,
                            PaidForName = paidFor.FirstName + " " + paidFor.LastName,
                            TransactionDate = t.TransactionDate,
                            Frequency = t.Frequency
                        };

            var groupExpenses = from t in repositories.GroupExpense.Get()
                join c in repositories.ExpenseCategory.Get()
                    on t.Category equals c
                join paidBy in repositories.UserDetail.Get()
                    on t.PaidBy equals paidBy
                join paidFor in repositories.UserGroup.Get()
                    on t.PaidFor equals paidFor
                select new Result
                {
                    Id = t.Id,
                    Name = t.Name,
                    Amount = t.Amount,
                    CategoryId = c.Id,
                    CategoryName = c.Name,
                    Details = t.Details,
                    PaidByName = paidBy.FirstName + " " + paidBy.LastName,
                    PaidForName = paidFor.Name,
                    TransactionDate = t.TransactionDate,
                    Frequency = t.Frequency
                };


            var combinedExpenses = individualExpenses.Union(groupExpenses);

            if (_expenseCategoryId.HasValue)
                combinedExpenses = combinedExpenses.Where(t => t.CategoryId == _expenseCategoryId);

            var materialisedQuery = combinedExpenses.Select(t => new Result
            {
                Id = t.Id,
                Name = t.Name,
                Amount = t.Amount,
                CategoryName = t.CategoryName,
                Details = t.Details,
                PaidByName = t.PaidByName,
                PaidForName = t.PaidForName,
                TransactionDate = t.TransactionDate,
                Frequency = t.Frequency
            });

            totalFound = materialisedQuery.Count();

            var orderBy = $"{DefaultSortBy.TransactionDate} DESC";

            var results = ReturnAllResults ? materialisedQuery.OrderBy(orderBy).ToArray() :
                materialisedQuery.OrderBy(orderBy).Skip(_pagedListArgs.PageSize * _pagedListArgs.PageNumber).Take(_pagedListArgs.PageSize).ToArray();

            return results;

        }

        public class Result
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public decimal Amount { get; set; }
            public long CategoryId { get; set; }
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
