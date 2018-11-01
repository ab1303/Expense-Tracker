using System.Collections.Generic;
using ETS.Services.DTO;
using ETS.Services.Queries.Income;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Income
{
    public class PaySlipResponse : BaseApiResponse
    {
        public NgxDataTablePage Page { get; set; }
        public IEnumerable<PaySlipsQuery.Result> PaySlips { get; set; }
    }
}
