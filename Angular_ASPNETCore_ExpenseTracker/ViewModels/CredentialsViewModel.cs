
using Angular_ASPNETCore_ExpenseTracker.ViewModels.Validations;
using FluentValidation.Attributes;

namespace Angular_ASPNETCore_ExpenseTracker.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
