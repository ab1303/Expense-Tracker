using System;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.Models.PaySlip;
using ETS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Produces("application/json")]
    [Route("api/ExpenseCategory")]
    public class PaySlipController : Controller
    {
        private readonly IPaySlipService _paySlipService;
        private readonly ILogger _logger;

        public PaySlipController(IPaySlipService paySlipService, ILoggerFactory loggerFactory)
        {
            _paySlipService = paySlipService;
            _logger = loggerFactory.CreateLogger(nameof(PaySlipController));
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