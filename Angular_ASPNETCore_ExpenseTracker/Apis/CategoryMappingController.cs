using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using Angular_ASPNETCore_ExpenseTracker.Models.CategoryMapping;
using ETS.DomainCore.Enums;
using ETS.Services.Interfaces;
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
                    Message = "list of category mappings",

                };

                return Ok(categoryMappingResponse);

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
        public ActionResult AddCategoryMapping([FromBody]CategoryMappingInput categoryMapping)
        {
            try
            {
                var result = _categoryMappingService.AddCategoryMappings(categoryMapping.FieldCategory,categoryMapping.Source, categoryMapping.Target);
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

        [Route("Delete/{id}")]
        [HttpDelete]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        [ProducesResponseType(typeof(BaseApiResponse), 200)]
        public ActionResult RemoveCategoryMapping(long id)
        {
            try
            {
                var result = _categoryMappingService.RemoveCategoryMappings(id);
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