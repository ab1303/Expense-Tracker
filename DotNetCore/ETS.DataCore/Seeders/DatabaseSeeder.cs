using ETS.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace ETS.DataCore.Seeders
{
    public class DatabaseSeeder
    {
        public DatabaseSeeder(ILoggerFactory loggerFactory)
        {
            LoggerFactory = loggerFactory;
        }

        public ILoggerFactory LoggerFactory { get; }

        public void SeedAsync(IServiceProvider serviceProvider)
        {

            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var dataContext = serviceScope.ServiceProvider.GetService<DataContext>();
                SeedAsync(dataContext);
            }
        }

        public void SeedAsync(DataContext dataContext)
        {
            new ExpenseCategoryDbSeeder(LoggerFactory).SeedAsync(dataContext).Wait();

        }

    }
}
