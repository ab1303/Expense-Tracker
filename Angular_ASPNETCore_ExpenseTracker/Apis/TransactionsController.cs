using System;
using System.Collections.Generic;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/Transactions")]
    public class TransactionsController : Controller
    {
        private readonly ILogger _logger;

        public TransactionsController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(nameof(TransactionsController));
        }

        //[HttpGet]
        //[ProducesResponseType(typeof(List<ExpenseCategoryResponse>), 200)]
        //[ProducesResponseType(typeof(BaseApiResponse), 400)]
        //public ActionResult Get()
        //{
        //    try
        //    {
             

        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex.Message);
        //        return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
        //    }
        //}

    }
}