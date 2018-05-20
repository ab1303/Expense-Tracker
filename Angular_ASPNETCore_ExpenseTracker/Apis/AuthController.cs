using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Angular_ASPNETCore_ExpenseTracker.Helper;
using Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication;
using Angular_ASPNETCore_ExpenseTracker.Models;
using Angular_ASPNETCore_ExpenseTracker.ViewModels;
using ETS.DomainCore.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthController(UserManager<ApplicationUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpGet("identity", Name = "GetIdentity")]
        //[Authorize(Policy = "ApiUser")]
        public async Task<IActionResult> Get(string userName)
        {
            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });

            var identity = await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            if (identity == null)
                return BadRequest(new BaseApiResponse { Code = InternalApiStatusCode.Error });

            var userAppClaims = GetUserApplicationClaims();
            identity.AddClaims(userAppClaims);

            var jwt = await Tokens.GenerateAppUserAuth(identity, _jwtFactory, userName, _jwtOptions,
                new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented,
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
            return new OkObjectResult(jwt);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var userAppClaims = GetUserApplicationClaims();
            identity.AddClaims(userAppClaims);

            var jwt = await Tokens.GenerateAppUserAuth(identity, _jwtFactory, credentials.UserName, _jwtOptions, 
                new JsonSerializerSettings {
                    Formatting = Formatting.Indented,
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }

        // TODO: Store and retrieve these claims based on Identity from backend store... dynamic code
        private IEnumerable<Claim> GetUserApplicationClaims()
        {
            var userAppClaims = new List<Claim>
            {
              new Claim(Constants.Strings.AppClaims.CanAccessDashboard, "true"),
            };

            return userAppClaims;
        }
        //private async Task<Claim> GetRoleClaims
    }
}