using System;
using System.Collections.Generic;

namespace Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication
{
    public class AppUserAuth
    {
        public AppUserAuth() : base()
        {
            UserName = "Not authorized";
            BearerToken = string.Empty;
        }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }
        public int Expires_In { get; set; }

        public List<AppUserClaim> Claims { get; set; }
    }
}
