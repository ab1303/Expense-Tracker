using System.Collections.Generic;
using ETS.Services.DTO.Reports;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Users
{
    public class ExpenseCategoryStatementResponse : BaseApiResponse
    {
        /// <summary>
        /// List of cities in a country
        /// </summary>
        public IEnumerable<ReportGroupDTO> ExpenseReportGroups { get; set; }
    }
}
