using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using ETS.DomainCore.Enums;
using ETS.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/CategoryMapping")]
    public class CategoryMappingController : Controller
    {
        private readonly ILogger _logger;
        private readonly ICategoryMappingService _categoryMappingService;

        public CategoryMappingController(ICategoryMappingService categoryMappingService, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(nameof(CategoryMappingController));
            _categoryMappingService = categoryMappingService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CategoryMappingResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get(FieldCategory fieldCategory)
        {
            try
            {
                var categoryMappingResponse = new CategoryMappingResponse
                {
                    CategoryMappings = _categoryMappingService.GetCategoryMappings(fieldCategory).Result,
                    Code = InternalApiStatusCode.Success,
                    Message = "list of expense categories",

                };

                return Ok(categoryMappingResponse);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }
    }
}