﻿using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using Angular_ASPNETCore_ExpenseTracker.Models.ExpenseCategory;
using ETS.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        [ProducesResponseType(typeof(ExpenseCategoryResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get()
        {
            try
            {
                var expenseCategoryResponse = new ExpenseCategoryResponse
                {
                    ExpenseCategories = _expenseCategoryService.GetExpenseCategories(),
                    Code = InternalApiStatusCode.Success,
                    Message = "list of expense categories",

                };

                return Ok(expenseCategoryResponse);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }

        [Route("Add")]
        [HttpPost]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        [ProducesResponseType(typeof(BaseApiResponse<long>), 200)]
        public ActionResult AddExpenseCategory([FromBody]ExpenseCategoryInput expenseCategory)
        {
            try
            {
                var result = _expenseCategoryService.AddExpenseCategory(expenseCategory.CategoryName, expenseCategory.CategoryDescription);
                if (!result.IsSuccess)
                    return BadRequest(new BaseApiResponse
                    {
                        Message = result.Message,
                        Code = InternalApiStatusCode.Error
                    });

                return Ok(new BaseApiResponse<long>
                {
                    Message = result.Message,
                    Code = InternalApiStatusCode.Error,
                    Model = result.Result
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

        [Route("Update/{id}")]
        [HttpPut]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        [ProducesResponseType(typeof(BaseApiResponse), 200)]
        public ActionResult UpdateExpenseCategory(long id, [FromBody]ExpenseCategoryInput expenseCategory)
        {
            try
            {
                var result = _expenseCategoryService.UpdateExpenseCategory(id, expenseCategory.CategoryName, expenseCategory.CategoryDescription);
                if (!result.IsSuccess)
                    return BadRequest(new BaseApiResponse
                    {
                        Message = result.Message,
                        Code = InternalApiStatusCode.Error
                    });

                return Ok(new BaseApiResponse
                {
                    Message = result.Message,
                    Code = InternalApiStatusCode.Error,
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

        [Route("Delete/{id}")]
        [HttpDelete]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        [ProducesResponseType(typeof(BaseApiResponse), 200)]
        public ActionResult RemoveExpenseCategory(long id)
        {
            try
            {
                var result = _expenseCategoryService.DeleteExpenseCategory(id);
                if (!result.IsSuccess)
                    return BadRequest(new BaseApiResponse
                    {
                        Message = result.Message,
                        Code = InternalApiStatusCode.Error
                    });

                return Ok(new BaseApiResponse
                {
                    Message = result.Message,
                    Code = InternalApiStatusCode.Error,
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