using ETS.Services.Queries;
using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Users
{
    public class UserDetailsResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<ExpenseCategoryStatementQuery.Result> UserDetails { get; set; }
    }
}
