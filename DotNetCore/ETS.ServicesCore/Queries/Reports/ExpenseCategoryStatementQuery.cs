using System.Linq;
using ETS.Service.Services;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Repositories;

namespace ETS.Services.Queries.Reports
{
    public class ExpenseCategoryStatementQuery : IQuery<ExpenseCategoryStatementQuery.Result>
    {

        public class Result
        {
            public int Year { get; set; }
            public int Month { get; set; }
            public long? UserId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public long GroupId { get; set; }
            public string GroupName { get; set; }
            public long CategoryId { get; set; }
            public string CategoryName { get; set; }
            public decimal Amount { get; set; }
        }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {

            var individualExpenseCategories = (from i in repositories.IndividualExpense.Get()
                         join c in repositories.ExpenseCategory.Get()
                         on i.Category equals c
                         join u in repositories.UserDetail.Get()
                         on i.PaidFor equals u
                         join ug in repositories.UserGroup.Get()
                         on u.UserGroupId equals ug.Id
                         group new { i, c, u, ug } by new
                         {
                             Year = i.TransactionDate.Year,
                             Month = i.TransactionDate.Month,
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
                             Year = groupedCategory.Key.Year,
                             Month = groupedCategory.Key.Month,
                             UserId = groupedCategory.Key.Id,
                             FirstName = groupedCategory.Key.FirstName,
                             LastName = groupedCategory.Key.LastName,
                             CategoryId = groupedCategory.Key.CategoryId,
                             CategoryName = groupedCategory.Key.CategoryName,
                             GroupId = groupedCategory.Key.GroupId,
                             GroupName = groupedCategory.Key.GroupName,
                             Amount = groupedCategory.Sum(g => g.i.Amount),
                         }).ToList();


            var groupExpenseCategories = (from g in repositories.GroupExpense.Get()
                                               join c in repositories.ExpenseCategory.Get()
                                               on g.Category equals c
                                               join ug in repositories.UserGroup.Get()
                                               on g.PaidFor equals ug
                                               group new { g, c, ug } by new
                                               {
                                                   Year = g.TransactionDate.Year,
                                                   Month = g.TransactionDate.Month,
                                                   GroupId = ug.Id,
                                                   GroupName = ug.Name,
                                                   CategoryId = c.Id,
                                                   CategoryName = c.Name,
                                               } into groupedCategory
                                               select new Result
                                               {
                                                   Year = groupedCategory.Key.Year,
                                                   Month = groupedCategory.Key.Month,
                                                   UserId = null,
                                                   FirstName = null,
                                                   LastName = null,
                                                   CategoryId = groupedCategory.Key.CategoryId,
                                                   CategoryName = groupedCategory.Key.CategoryName,
                                                   GroupId = groupedCategory.Key.GroupId,
                                                   GroupName = groupedCategory.Key.GroupName,
                                                   Amount = groupedCategory.Sum(g => g.g.Amount),
                                               }).ToList();



            var expenseCategory = individualExpenseCategories.Union(groupExpenseCategories);

            var expenseCategoryEnumerable = expenseCategory as Result[] ?? expenseCategory.ToArray();
            totalFound = expenseCategoryEnumerable.Count();

            return expenseCategoryEnumerable;
        }
    }
}
