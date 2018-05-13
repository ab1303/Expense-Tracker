using ETS.Core.Interfaces;
using ETS.DataCore.Implementations;
using ETS.DataCore.Intefaces;
using ETS.DataCore.Seeders;
using Microsoft.Extensions.DependencyInjection;

namespace ETS.DataCore
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection RegisterDatabaseService(this IServiceCollection services)
        {
            services.AddTransient<DatabaseSeeder>();
            services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();
            services.AddScoped<IDataContext, DataContext>();

            return services;
        }
    }
}
