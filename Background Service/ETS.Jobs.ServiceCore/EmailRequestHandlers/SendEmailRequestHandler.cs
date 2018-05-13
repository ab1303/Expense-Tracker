using System;
using System.ComponentModel;
using ETS.Jobs.Request;
using ETS.Services.Interfaces.ChangeTracking;
using ETS.Services.Repositories;
using Microsoft.Extensions.Logging;

namespace ETS.Jobs.Service.JobRequestHandlers
{
    public class SendEmailRequestHandler : AbstractRequestHandler<SendEmailRequest>, ISendEmailRequest
    {
        private readonly IRepositories _repositories;
        private readonly IUnitOfWork _unitOfWork;

        public SendEmailRequestHandler(
            ILogger<SendEmailRequest> logger,
            IRepositories repositories,
            IUnitOfWork unitOfWork
            )
        : base(logger)
        {
            _repositories = repositories;
            _unitOfWork = unitOfWork;
        }

        [DisplayName("SimpleJobTest")]
        protected override void HandleRequest(SendEmailRequest request)
        {
            Console.WriteLine(request.Message);
        }
    }
}
