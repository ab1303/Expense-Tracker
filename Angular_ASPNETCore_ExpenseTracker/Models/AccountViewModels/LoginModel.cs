using System.ComponentModel.DataAnnotations;

namespace Angular_ASPNETCore_ExpenseTracker.Models
{
    public class LoginModel
    {
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}