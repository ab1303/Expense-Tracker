using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace ETS.Core.Helpers
{
    public static class RegexHelper
    {
        public const string NameRegex = @"^$|^[a-zA-Z]+([a-zA-Z0-9\-'\s]*)$";
        public const string NameRegexErrorMessage = "Name allows only alphanumeric characters and can start with alphabet only";

        public const string LoginRegex = @"^[a-zA-Z]+([a-zA-Z0-9]*)$";
        public const string LoginRegexErrorMessage = "Login allows only alphanumeric characters and can start with alphabet only";

        public const string PrintableRegex = @"^[\u0020-\u007E]*$";
        public const string PrintableRegexErrorMessage = "Field contains non printable character(s)";

        public const string ValidSiteName = @"^[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$";

        public const string PhoneRegex = @"^[0-9]{10}$";
        public const string PhoneRegexErrorMessage = "Invalid phone number. Phone number should be numeric and 10 digits";

        public const string PasswordRegex = @"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$";
        public const string PasswordRegexErrorMessage = "The password must contain 8 to 20 characters and include uppercase, lowercase, number and special characters.";

        public const string PoBoxRegex = "^((?![Pp](.?)[Oo](.?)( ?)[Bb][Oo][Xx]).)*$";
        public const string PoBoxRegexErrorMessage = "Please note: we do not ship to PO Boxes";

        
        public const string EmailRegex = @"^$|^(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([;, ]+)?)+";
        public const string EmailRegexErrorMessage = "Email is not valid.";
        

        static string DomainMapper(Match match, out bool invalid)
        {
            invalid = false;
            // IdnMapping class with default property values.
            var idn = new IdnMapping();

            string domainName = match.Groups[2].Value;
            try
            {
                domainName = idn.GetAscii(domainName);
            }
            catch (ArgumentException)
            {
                invalid = true;
            }
            return match.Groups[1].Value + domainName;
        }
    }
}
