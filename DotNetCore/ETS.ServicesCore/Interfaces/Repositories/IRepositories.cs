using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public interface IRepositories
    {
        IExpenseCategoryRepository ExpenseCategory { get; set; }
        IFieldCategoryMappingRepository FieldCategoryMapping { get; set; }
        ITransactionRepository Transaction { get; set; }
        IGroupExpenseRepository GroupExpense { get; set; }
        IIndividualExpenseRepository IndividualExpense { get; set; }
        IUserDetailRepository UserDetail { get; set; }
        IUserGroupRepository UserGroup { get; set; }
    }
}
