using ETS.Service.Services;
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
            // Register Repositories
            services.AddScoped<IExpenseCategoryRepository, ExpenseCategoryRepository>();
            services.AddScoped<IFieldCategoryMappingRepository, FieldCategoryMappingRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IGroupExpenseRepository, GroupExpenseRepository>();
            services.AddScoped<IIndividualExpenseRepository, IndividualExpenseRepository>();
            services.AddScoped<IUserDetailRepository, UserDetailRepository>();
            services.AddScoped<IUserGroupRepository, UserGroupRepository>();

            services.AddScoped<IRepositories, Repositories.Repositories>();
           
           
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IExpenseCategoryService, ExpenseCategoryService>();
            services.AddScoped<IQueryService, QueryService>();

            return services;
        }
    }
}
