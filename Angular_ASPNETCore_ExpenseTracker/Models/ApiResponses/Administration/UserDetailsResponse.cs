using System.Collections.Generic;
using ETS.Services.Queries.Reports;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Administration
{
    public class UserDetailsResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<ExpenseCategoryStatementQuery.Result> UserDetails { get; set; }
    }
}
