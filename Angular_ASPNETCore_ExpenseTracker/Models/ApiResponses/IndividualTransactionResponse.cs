using ETS.Services.Queries;
using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses
{
    public class IndividualTransactionResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<IndividualTransactionsIndexQuery.Result> IndividualTransactions { get; set; }
    }
}
