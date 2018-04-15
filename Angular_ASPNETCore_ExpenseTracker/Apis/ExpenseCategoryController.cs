using System;
using System.Collections.Generic;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using ETS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/ExpenseCategory")]
    public class ExpenseCategoryController : Controller
    {
        private readonly IExpenseCategoryService _expenseCategoryService;
        private readonly ILogger _logger;

        public ExpenseCategoryController(IExpenseCategoryService expenseCategoryService, ILoggerFactory loggerFactory)
        {
            _expenseCategoryService = expenseCategoryService;
            _logger = loggerFactory.CreateLogger(nameof(ExpenseCategoryController));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<ExpenseCategoryResponse>), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get()
        {
            try
            {
                var expenseCategoryResposne = new ExpenseCategoryResponse
                {
                    ExpenseCategories = _expenseCategoryService.GetExpenseCategories(),
                    Code = InternalApiStatusCode.Success,
                    Message = "list of expense categories",

                };

                return Ok(expenseCategoryResposne);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }
    }
}