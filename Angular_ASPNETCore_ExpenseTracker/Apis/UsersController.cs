using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Administration;
using ETS.Service.Services;
using ETS.Services.Queries.Reports;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly IQueryService _queryService;
        private readonly ILogger _logger;

        public UsersController(IQueryService queryService, ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(nameof(UsersController));
            _queryService = queryService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(UserDetailsResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get()
        {
            try
            {
                var usersIndexQuery = new ExpenseCategoryStatementQuery();

                var result = _queryService.Execute(usersIndexQuery, out int totalCount);

                var userDetailsResponse = new UserDetailsResponse
                {
                    UserDetails = result,
                    Code = InternalApiStatusCode.Success,
                    Message = "list of individual users in application",

                };

                return Ok(userDetailsResponse);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });
            }
        }

    }
}