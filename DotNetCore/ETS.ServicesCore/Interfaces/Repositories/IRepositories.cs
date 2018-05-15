using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public interface IRepositories
    {
        IExpenseCategoryRepository ExpenseCategoryRepository { get; set; }
    }
}
