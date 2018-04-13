using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication
{
  public class AppUserClaim
  {
    [Required()]
    public string ClaimType { get; set; }

    [Required()]
    public string ClaimValue { get; set; }
  }
}
