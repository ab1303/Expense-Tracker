using ETS.Services.Queries;
using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Users
{
    public class ExpenseCategoryStatementResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<ExpenseCategoryStatementQuery.Result> expenseCategories { get; set; }
    }
}
