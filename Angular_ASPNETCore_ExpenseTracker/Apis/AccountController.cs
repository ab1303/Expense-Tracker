using System.Threading.Tasks;
using Angular_ASPNETCore_ExpenseTracker.Helper;
using Angular_ASPNETCore_ExpenseTracker.ViewModels;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public AccountController(UserManager<ApplicationUser> userManager,
          SignInManager<ApplicationUser> signInManager,
           IUserClaimsPrincipalFactory<ApplicationUser> claimsPrincipalFactory,
           ILogger<AccountController> logger,
           IMapper mapper,
           IAccountService accountService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _claimsPrincipalFactory = claimsPrincipalFactory;
            _logger = logger;
            _accountService = accountService;
            _mapper = mapper;
        }


        [HttpPost]
        //[HttpPost("register")]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // TODO: THink of Unit of work

            var userIdentity = _mapper.Map<ApplicationUser>(model);
            //var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            var registrationResult = await _accountService.RegisterUser(userIdentity.Id, model.Location);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            return new OkObjectResult("Account created");
        }
    }
}