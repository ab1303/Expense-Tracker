using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_ExpenseTracker.Helper
{
    public static class ControllerExtensions
    {
        private const string MessageKey = "Message";

        public static HtmlString GetMessage(this Controller controller)
        {
            return controller.TempData[MessageKey] as HtmlString;
        }

        public static void SetMessage(this Controller controller, HtmlString value)
        {
            controller.TempData[MessageKey] = value;
        }
    }
}
