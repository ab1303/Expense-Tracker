using ETS.Jobs.Request;
using ETS.Jobs.ServiceCore.JobsRequestHandlers;
using Microsoft.Extensions.DependencyInjection;

namespace ETS.Jobs.ServiceCore
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection RegisterBackgroundJobServices(this IServiceCollection services)
        {
            services.AddScoped<IProcessMonthlyExpenseFileUploadRequest, ProcessMonthlyExpenseFileUploadRequestHandler>();

            return services;
        }
    }
}
