using System.Collections.Generic;
using ETS.Services.Queries;
using ETS.Services.Queries.Reports;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Administration
{
    public class UserDetailsResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<UsersIndexQuery.Result> UserDetails { get; set; }
    }
}
