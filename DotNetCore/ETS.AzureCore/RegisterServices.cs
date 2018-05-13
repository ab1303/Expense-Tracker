using ETS.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace ETS.Azure
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection RegisterAzureStorageService(this IServiceCollection services)
        {
            services.AddScoped<IFileStorage, FileStorage>();

            return services;
        }
    }
}
