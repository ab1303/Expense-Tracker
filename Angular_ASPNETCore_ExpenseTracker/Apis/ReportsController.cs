using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Users;
using ETS.Service.Services;
using ETS.Services.Interfaces;
using ETS.Services.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/Reports")]
    public class ReportsController : Controller
    {
        private readonly IQueryService _queryService;
        private readonly IReportingService _reportingService;
        private readonly ILogger _logger;

        public ReportsController(IQueryService queryService, IReportingService reportingService, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(nameof(UsersController));
            _queryService = queryService;
            _reportingService = reportingService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(UserDetailsResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get()
        {
            try
            {
                var result = _reportingService.ExpenseCategoryReport();

                var expenseCategoryStatementResponse = new ExpenseCategoryStatementResponse
                {
                    ExpenseReportGroups = result,
                    Code = InternalApiStatusCode.Success,
                    Message = "Expense Category Report by date",

                };

                return Ok(expenseCategoryStatementResponse);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }

    }
}