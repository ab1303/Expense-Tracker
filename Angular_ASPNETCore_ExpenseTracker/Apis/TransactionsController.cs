using System;
using System.Linq;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.AngularDataTable;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using Angular_ASPNETCore_ExpenseTracker.Models.ExpenseRegister;
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
        private readonly ITransactionService _transactionService;
        private readonly IExpenseCategoryService _expenseCategoryService;

        public TransactionsController(IQueryService queryService, ITransactionService transactionService, IExpenseCategoryService expenseCategoryService, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(nameof(TransactionsController));
            _queryService = queryService;
            _transactionService = transactionService;
            _expenseCategoryService = expenseCategoryService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(IndividualTransactionResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get(AngularDataTableParam ngxDataTableParam, ExpenseRegisterSearchModel searchModel)
        {
            try
            {
                var individualTransactionQuery = new IndividualTransactionsIndexQuery(expenseCategoryId: searchModel.ExpenseCategoryId)
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

        [Route("SearchLookups")]
        [HttpGet]
        [ProducesResponseType(typeof(Lookups), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult GetSearchLookups()
        {
            try
            {

                var expenseCategories = _expenseCategoryService.GetExpenseCategories();

                var searchLookups = new Lookups
                {
                    ExpenseCategories = expenseCategories,
                    Code = InternalApiStatusCode.Success,
                    Message = "list of individual categories",

                };

                return Ok(searchLookups);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }

        [Route("BulkUpdate")]
        [HttpPost]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult UpdateTransactions([FromBody]BulkUpdateModel bulkUpdateModel)
        {
            try
            {
                var result = _transactionService.UpdateTransactions(bulkUpdateModel.TransactionIds.ToArray(), bulkUpdateModel.ExpenseCategoryId);
                if (!result.IsSuccess)
                    return BadRequest(new BaseApiResponse
                    {
                        Message = result.Message,
                        Code = InternalApiStatusCode.Error
                    });

                return Ok(new BaseApiResponse
                {
                    Message = result.Message,
                    Code = InternalApiStatusCode.Error
                });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse
                {
                    Message = ex.Message,
                    Code = InternalApiStatusCode.Error
                });
            }
        }


    }
}