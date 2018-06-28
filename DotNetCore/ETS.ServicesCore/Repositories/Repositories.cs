using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class Repositories : IRepositories
    {
        public IExpenseCategoryRepository ExpenseCategory { get; set; }
        public IFieldCategoryMappingRepository FieldCategoryMapping { get; set; }
        public IGroupExpenseRepository GroupExpense { get; set; }
        public IIndividualExpenseRepository IndividualExpense { get; set; }
        public IUserDetailRepository UserDetail { get; set; }
        public IUserGroupRepository UserGroup { get; set; }
    }
}
