using ETS.Jobs.Request;
using Microsoft.AspNetCore.Builder;
using Hangfire;

namespace ETS.JobsHost.Core
{
    public static class JobScheduler
    {
        public static IApplicationBuilder ScheduleRecurringRiskPeerReviewEmail(this IApplicationBuilder app, string cronExpression)
        {
            RecurringJob.AddOrUpdate<IProcessMonthlyExpenseFileUploadRequest>(
               x => x.Handle(new ProcessMonthlyExpenseFileUploadRequest
               {

               }), cronExpression
               );

            return app;
        }

    }
}
