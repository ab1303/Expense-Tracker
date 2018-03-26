using System.Linq;
using System.Text.RegularExpressions;

namespace UGC.Core.Helpers
{
    public static class EmailAddressHelper
    {
        public const string EmailRegex = @"(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([;, ]+)?)+";

        public const string MultipleEmailRegex = @"^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$";

        public static string[] ParseEmailAddresses(this string emailAddressList)
        {
            var regex = new Regex(EmailRegex, RegexOptions.IgnoreCase);
            var matches = regex.Matches(emailAddressList);

            return matches.Count <= 0 ? new[] { string.Empty } : (from Match match in matches select match.Value).ToArray();
        }
    }
}