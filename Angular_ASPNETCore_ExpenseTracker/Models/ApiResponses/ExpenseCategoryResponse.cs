using ETS.Services.DTO;
using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses
{
    public class ExpenseCategoryResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<ExpenseCategoryDTO> ExpenseCategories { get; set; }
    }
}
