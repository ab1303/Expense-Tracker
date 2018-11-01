using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.PaySlip;
using ETS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Angular_ASPNETCore_ExpenseTracker.Models.AngularDataTable;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses;
using Angular_ASPNETCore_ExpenseTracker.Models.ApiResponses.Income;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.DTO;
using ETS.Services.Queries.Income;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/PaySlip")]
    public class PaySlipController : Controller
    {
        private readonly IPaySlipService _paySlipService;
        private readonly ILogger _logger;
        private readonly IQueryService _queryService;

        public PaySlipController(IPaySlipService paySlipService, ILoggerFactory loggerFactory, IQueryService queryService)
        {
            _paySlipService = paySlipService;
            _queryService = queryService;
            _logger = loggerFactory.CreateLogger(nameof(PaySlipController));
        }


        [HttpGet]
        [ProducesResponseType(typeof(IndividualTransactionResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        public ActionResult Get(AngularDataTableParam ngxDataTableParam)
        {
            try
            {
                var paySlipsQuery = new PaySlipsQuery()
                        .SetPage(new NgxDataTableArgs
                        {
                            PageNumber = ngxDataTableParam.PageIndex,
                            SortBy = ngxDataTableParam.SortColumnName ?? PaySlipsQuery.DefaultSortBy.StartDate,
                            SortOrder = ngxDataTableParam.SortOrder,
                            PageSize = ngxDataTableParam.PageSize
                        })
                    ;

                var result = _queryService.Execute(paySlipsQuery, out int totalCount);

                var paySlipResponse = new PaySlipResponse
                {
                    PaySlips = result,
                    Page = new NgxDataTablePage
                    {
                        TotalElements = totalCount,
                        Size = ngxDataTableParam.PageSize,
                        PageNumber = ngxDataTableParam.PageIndex,
                    },
                    Code = InternalApiStatusCode.Success,
                    Message = "list of individual categories",

                };

                return Ok(paySlipResponse);

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
        public ActionResult AddPaySlip([FromBody]PaySlipInput paySlip)
        {
            try
            {
                var result = _paySlipService.AddPaySlip(paySlip.PeriodStart, paySlip.PeriodEnd, paySlip.Frequency,
                    paySlip.TotalEarnings, paySlip.NetPay, paySlip.SuperAnnuation);

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
                    Model = result.Model
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