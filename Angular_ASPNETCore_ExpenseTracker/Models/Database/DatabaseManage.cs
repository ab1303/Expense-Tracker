using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Angular_ASPNETCore_ExpenseTracker.Models.Database
{
    public class DatabaseManage : BaseModel
    {
        [Required]
        public string DatabaseVersion { get; set; }

        public SelectListItem[] DatabaseVersions { get; set; }

        public DatabaseManage()
        {
            DatabaseVersions = new SelectListItem[0];
        }
    }
}
