using System.Diagnostics;
using System.Linq;
using Angular_ASPNETCore_ExpenseTracker.Helper;
using Angular_ASPNETCore_ExpenseTracker.Models.Database;
using ETS.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_ExpenseTracker.Controllers
{
    public class DatabaseController : Controller
    {
        private readonly IDatabaseInitializer _databaseInitializer;

        public DatabaseController(IDatabaseInitializer databaseInitializer)
        {
            _databaseInitializer = databaseInitializer;
        }

        //// GET: Database
        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult DropAndRecreate(bool seedDemoData)
        {
            ConditionalDropAndRecreate(seedDemoData);
            return RedirectToAction("Index", "Home");
        }

        [Conditional("ALLOW_DB_DROP")]
        private void ConditionalDropAndRecreate(bool seedDemoData)
        {
            _databaseInitializer.ConditionalDropAndRecreate(seedDemoData);
        }


        [HttpGet]
        public ActionResult Manage()
        {
            var vm = new DatabaseManage();
            PopulateLists(vm);

            return View(vm);
        }

        [HttpPost]
        public ActionResult Manage(DatabaseManage vm)
        {
            if (!ModelState.IsValid)
            {
                PopulateLists(vm);
                return View(vm);
            }

            _databaseInitializer.UpdateDatabaseToVersion(vm.DatabaseVersion);

            PopulateLists(vm);

            this.SetMessage(HtmlMessageHelper.SuccessMessage("The database is upgraded successfully!!"));

            return View(vm);
        }

        private void PopulateLists(DatabaseManage vm)
        {
            var versions = _databaseInitializer.GetPendingMigrations().ToListItems(x => string.Format("{0} (Pending)", x), y => y).ToList();
            vm.DatabaseVersions = versions.ToArray();
        }
    }
}