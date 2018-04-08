
using System.Security.Claims;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }
}
