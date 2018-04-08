using System.ComponentModel.DataAnnotations;

namespace Angular_ASPNETCore_ExpenseTracker.Models
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}