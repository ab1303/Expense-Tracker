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
        
        public Repositories(
            IExpenseCategoryRepository expenseCategoryRepository,
            IFieldCategoryMappingRepository fieldCategoryMappingRepository,
            IGroupExpenseRepository groupExpenseRepository,
            IIndividualExpenseRepository individualExpenseRepository,
            IUserDetailRepository userDetailRepository,
            IUserGroupRepository userGroupRepository
            )
        {
            ExpenseCategory = expenseCategoryRepository;
            FieldCategoryMapping = fieldCategoryMappingRepository;
            GroupExpense = groupExpenseRepository;
            IndividualExpense = individualExpenseRepository;
            UserDetail = userDetailRepository;
            UserGroup = userGroupRepository;
        }
    }
}
