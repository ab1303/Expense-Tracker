using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace UGC.Core.Helpers
{
    public static class UserPrincipalHelper
    {
        public static string LoggedInUser(this IPrincipal principal)
        {
            var userLogin = string.Empty;

            if (principal == null || principal.Identity == null)
                return userLogin;

            switch (principal.Identity.AuthenticationType)
            {
                //TODO: Remove Federation, if not needed
                case "Federation":
                    var identity = principal.Identity as ClaimsIdentity;
                    if (identity != null)
                        userLogin = identity.Name ?? principal.GetEmailAddress();
                    break;
                case "Forms":
                    // Temp implementation by WX
                    userLogin = principal.Identity.Name;
                    break;
                case "Basic":
                    identity = principal.Identity as ClaimsIdentity;
                    if (identity != null)
                        userLogin = identity.Name;
                    break;
            }

            return userLogin;
        }
    }

    public static class ClaimPrincipalHelper
    {
        public static string GetFirstName(this IPrincipal principal)
        {
            var firstName = string.Empty;

            var identity = principal.Identity as ClaimsIdentity;

            if (principal == null || identity == null)
                return firstName;
            firstName = identity.Claims.Where(c => c.Type == ClaimTypes.GivenName)
                    .Select(c => c.Value)
                    .FirstOrDefault();
                        
            return firstName;
        }

        public static string GetLastName(this IPrincipal principal)
        {
            var surName = string.Empty;

            var identity = principal.Identity as ClaimsIdentity;

            if (principal == null || identity == null)
                return surName;

            surName = identity.Claims.Where(c => c.Type == ClaimTypes.Surname)
                    .Select(c => c.Value)
                    .FirstOrDefault();

            return surName;
        }

        public static string GetEmailAddress(this IPrincipal principal)
        {
            var emailAddress = string.Empty;

            var identity = principal.Identity as ClaimsIdentity;

            if (principal == null || identity == null)
                return emailAddress;

            emailAddress = identity.Claims.Where(c => c.Type == ClaimTypes.Email)
                    .Select(c => c.Value)
                    .FirstOrDefault();

            return emailAddress;
        }
    }    
}
