using System;
using System.ComponentModel.DataAnnotations;

namespace Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication
{
    public class AppUserInput
  {
    [Required()]
    [Key()]
    public Guid UserId { get; set; }

    [Required()]
    [StringLength(255)]
    public string UserName { get; set; }

    [Required()]
    [StringLength(255)]
    public string Password { get; set; }
  }
}
