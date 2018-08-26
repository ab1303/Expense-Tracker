using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.AngularDataTable;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.Interfaces;
using ETS.Services.Queries;
using ETS.Services.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/Transactions")]
    public class TransactionsController : Controller
    {
        private readonly ILogger _logger;
        private readonly IQueryService _queryService;

        public TransactionsController(IQueryService queryService, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(nameof(TransactionsController));
            _queryService = queryService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(IndividualTransactionResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get(AngularDataTableParam ngxDataTableParam)
        {
            try
            {
                var individualTransactionQuery = new IndividualTransactionsIndexQuery()
                    .SetPage(new NgxDataTableArgs
                    {
                        PageNumber = ngxDataTableParam.PageIndex,
                        SortBy = ngxDataTableParam.SortColumnName ?? IndividualTransactionsIndexQuery.DefaultSortBy.TransactionDate,
                        SortOrder = ngxDataTableParam.SortOrder,
                        PageSize = ngxDataTableParam.PageSize
                    })
                    ;




                var result = _queryService.Execute(individualTransactionQuery, out int totalCount);

                var individualTransactionResponse = new IndividualTransactionResponse
                {
                    IndividualTransactions = result,
                    Page = new NgxDataTablePage
                    {
                        TotalElements = totalCount,
                        Size = ngxDataTableParam.PageSize,
                        PageNumber = ngxDataTableParam.PageIndex,
                    },
                    Code = InternalApiStatusCode.Success,
                    Message = "list of individual categories",

                };

                return Ok(individualTransactionResponse);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }

    }
}