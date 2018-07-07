using ETS.Core.Interfaces;
using ETS.DataCore.Implementations;
using ETS.DataCore.Intefaces;
using ETS.DataCore.Seeders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ETS.DataCore
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection RegisterDatabaseService(this IServiceCollection services, IConfiguration configuration)
        {


            //Add SQL Server support
            var migrationAssembly = typeof(DataContext).GetTypeInfo().Assembly.GetName().Name;
            services.AddDbContext<DataContext>(options => options.UseSqlServer(
                configuration.GetConnectionString("DataConnection"),
                sql => sql.MigrationsAssembly(migrationAssembly)));

            services.AddTransient<DatabaseSeeder>();
            services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();
            services.AddScoped<IDataContext, DataContext>();
            services.AddScoped<IBackgroundServiceDataContext, BackgroundServiceDataContext>();

            return services;
        }
    }
}
