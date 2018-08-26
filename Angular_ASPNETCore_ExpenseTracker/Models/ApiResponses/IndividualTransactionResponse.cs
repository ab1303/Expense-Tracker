﻿using ETS.Services.Queries;
using System.Collections.Generic;
using ETS.Services.DTO;

namespace Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses
{
    public class IndividualTransactionResponse : BaseApiResponse
    {
        public NgxDataTablePage Page { get; set; }
        public IEnumerable<IndividualTransactionsIndexQuery.Result> IndividualTransactions { get; set; }
        public Lookups Lookups { get; set; }
    }

    public class Lookups
    {
        public IEnumerable<ExpenseCategoryDTO> ExpenseCategories { get; set; }
    }
}
