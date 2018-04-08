using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_Seed.Controllers
{
    public class HomeController : Controller
    {
        // TODO: This needs to be pure angular based jwt authentication later on rather than forms based authentication

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
