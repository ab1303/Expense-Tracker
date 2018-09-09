using Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Route("api/[controller]")]
    public class SecurityController : Controller
    {
        private JwtSettings _settings;
        public SecurityController(JwtSettings settings)
        {
            _settings = settings;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]AppUser user)
        {
            IActionResult ret = null;
            var auth = new AppUserAuth();
            var mgr = new SecurityManager(_settings);

            ret = StatusCode(StatusCodes.Status200OK, auth);

            //TODO: Abdul
            //auth = mgr.ValidateUser(user);
            //if (auth.IsAuthenticated)
            //{
            //    ret = StatusCode(StatusCodes.Status200OK, auth);
            //}
            //else
            //{
            //    ret = StatusCode(StatusCodes.Status404NotFound,
            //                     "Invalid User Name/Password.");
            //}

            return ret;
        }
    }
}
