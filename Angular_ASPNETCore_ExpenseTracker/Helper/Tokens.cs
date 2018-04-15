

using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication;
using Newtonsoft.Json;

namespace Angular_ASPNETCore_ExpenseTracker.Helper
{
    public class Tokens
    {
        public static async Task<string> GenerateAppUserAuth(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new AppUserAuth
            {
                Id = identity.Claims.Single(c => c.Type == "id").Value,
                UserName = userName,
                BearerToken = await jwtFactory.GenerateEncodedToken(userName, identity),
                IsAuthenticated = true,
                Expires_In = (int)jwtOptions.ValidFor.TotalSeconds,
                Claims = identity.Claims.Select( c => new AppUserClaim
                {
                    ClaimType = c.Type,
                    ClaimValue = c.Value,
                }).ToList()
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}
