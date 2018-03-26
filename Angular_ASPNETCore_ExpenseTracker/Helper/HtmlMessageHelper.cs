using Microsoft.AspNetCore.Html;
using System;

namespace Angular_ASPNETCore_ExpenseTracker.Helper
{
    public static class HtmlMessageHelper
    {
        public static HtmlString NotificationMessage(string message, params object[] args)
        {
            return String.IsNullOrEmpty(message) ? new HtmlString(String.Empty) : new HtmlString(String.Format(@"<div class=""alert alert-info slideup"">{0}</div>", string.Format(message, args)));
        }
        public static HtmlString ErrorMessage(string message, params object[] args)
        {
            return String.IsNullOrEmpty(message) ? new HtmlString(String.Empty) : new HtmlString(String.Format(@"<div class=""alert alert-danger"">{0}</div>", string.Format(message, args)));
        }

        public static HtmlString SuccessMessage(string message, params object[] args)
        {
            return String.IsNullOrEmpty(message) ? new HtmlString(String.Empty) : new HtmlString(String.Format(@"<div class=""alert alert-success slideup"">{0}</div>", string.Format(message, args)));
        }
        public static HtmlString SuccessStaticMessage(string message, params object[] args)
        {
            return String.IsNullOrEmpty(message) ? new HtmlString(String.Empty) : new HtmlString(String.Format(@"<div class=""alert alert-success"">{0}</div>", string.Format(message, args)));
        }
        public static HtmlString InfoMessage(string message, params object[] args)
        {
            return String.IsNullOrEmpty(message) ? new HtmlString(String.Empty) : new HtmlString(String.Format(@"<div class=""alert alert-info""><i class=""fa fa-info-circle""></i> {0}</div>", string.Format(message, args)));
        }
    }
}
