
namespace Angular_ASPNETCore_ExpenseTracker.Helper
{
    public static class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Rol = "rol", Id = "id";
            }

            public static class JwtClaims
            {
                public const string ApiAccess = "api_access";
            }

            public static class AppClaims
            {
                public const string CanAccessDashboard = "canAccessDashboard";
            }
        }
    }
}
