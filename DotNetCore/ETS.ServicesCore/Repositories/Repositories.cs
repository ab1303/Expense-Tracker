using ETS.Services.Interfaces.Repositories;

namespace ETS.Services.Repositories
{
    public class Repositories : IRepositories
    {
        public IExpenseCategoryRepository ExpenseCategory { get; set; }
        public IPaySlipRepository PaySlip { get; set; }
        public IFieldCategoryMappingRepository FieldCategoryMapping { get; set; }
        public ITransactionRepository Transaction { get; set; }
        public IGroupExpenseRepository GroupExpense { get; set; }
        public IIndividualExpenseRepository IndividualExpense { get; set; }
        public IUserDetailRepository UserDetail { get; set; }
        public IUserGroupRepository UserGroup { get; set; }
        
        public Repositories(
            IExpenseCategoryRepository expenseCategoryRepository,
            IPaySlipRepository paySlipRepository,
            IFieldCategoryMappingRepository fieldCategoryMappingRepository,
            ITransactionRepository transaction,
            IGroupExpenseRepository groupExpenseRepository,
            IIndividualExpenseRepository individualExpenseRepository,
            IUserDetailRepository userDetailRepository,
            IUserGroupRepository userGroupRepository
            )
        {
            PaySlip = paySlipRepository;
            ExpenseCategory = expenseCategoryRepository;
            FieldCategoryMapping = fieldCategoryMappingRepository;
            Transaction = transaction;
            GroupExpense = groupExpenseRepository;
            IndividualExpense = individualExpenseRepository;
            UserDetail = userDetailRepository;
            UserGroup = userGroupRepository;
        }
    }
}
