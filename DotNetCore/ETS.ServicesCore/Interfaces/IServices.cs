using ETS.Service.Services;
using System;

namespace ETS.Services.Interfaces
{
    public interface IServices
    {
        Lazy<IExpenseCategoryService> ExpenseCategoryService { get; }
        Lazy<IQueryService> QueryService { get; }
    }
}
