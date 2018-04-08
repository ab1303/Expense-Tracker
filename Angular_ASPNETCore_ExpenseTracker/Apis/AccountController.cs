using System.Threading.Tasks;
using Angular_ASPNETCore_ExpenseTracker.Helper;
using Angular_ASPNETCore_ExpenseTracker.Models.AccountViewModels;
using ETS.DomainCore.Model;
using ETS.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_ExpenseTracker.Apis
{
    [Route("api/account")]
    public class AccountController : Controller
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsPrincipalFactory;
        private readonly ILogger _logger;
        private readonly IAccountService _accountService;

        public AccountController(UserManager<ApplicationUser> userManager,
          SignInManager<ApplicationUser> signInManager,
           IUserClaimsPrincipalFactory<ApplicationUser> claimsPrincipalFactory,
           ILogger<AccountController> logger,
           IAccountService accountService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this._claimsPrincipalFactory = claimsPrincipalFactory;
            _logger = logger;
            this._accountService = accountService;
        }


        [HttpPost]
        //[HttpPost("register")]
        public async Task<IActionResult> Post([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            var registrationResult = _accountService.RegisterUser(user.Id);

            return new OkObjectResult("Account created");
        }
    }
}