using ETS.Services.Implementations;
using ETS.Services.Interfaces;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ETS.Services
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection RegisterInternalServices(this IServiceCollection services)
        {
            services.AddScoped<IRepositories, Repositories.Repositories>();
            services.AddScoped<IExpenseCategoryRepository, ExpenseCategoryRepository>();
           
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IExpenseCategoryService, ExpenseCategoryService>();

            return services;
        }
    }
}
