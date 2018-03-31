using System;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;

namespace ETS.Core.Extensions
{
    public static class StringExtensions
    {
        public static string Left(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;

            maxLength = Math.Abs(maxLength);

            return value.Length <= maxLength
                        ? value
                        : value.Substring(0, maxLength);
        }

        public static bool IsNumeric(this string value)
        {
            decimal convertedValue;
            return !string.IsNullOrWhiteSpace(value) && decimal.TryParse(value, out convertedValue);
        }

        public static long ToLong(this string value)
        {
            return string.IsNullOrWhiteSpace(value) ? default(long) : Convert.ToInt64(value.Trim());
        }

        public static long ToLong(this object value)
        {
            return value == null ? default(long) : Convert.ToInt64(value.ToString());
        }

        public static int ToInt(this string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return default(int);

            int result;
            int.TryParse(value, out result);
            return result;
        }

        public static int ToInt(this object value)
        {
            if (value == null)
                return default(int);

            int result;
            int.TryParse(value.ToString(), out result);
            return result;
        }

        /// <summary>
        /// The expected string value is in the following format: {from} - {to}
        /// The parsing of the date is culture aware, from the current thread
        /// </summary>
        public static bool ToDateTimeRange(this string value, out DateTime? fromDateTime, out DateTime? toDateTime)
        {
            fromDateTime = null;
            toDateTime = null;

            if (string.IsNullOrWhiteSpace(value)) return false;

            //Here in the value parameter we are expecting a hyphen(-) with a white space between two dates.
            //For example 12-Apr-2015 - 15-Apr-2015 or 12/04/2015 - 15/04/2015 
            const string pattern = @"\s-\s";
            string[] split = Regex.Split(value, pattern);

            if (split.Length < 2) return false;

            fromDateTime = split[0].ToDateTime();
            toDateTime = split[1].ToDateTime();

            if (toDateTime.HasValue)
            {
                toDateTime = new DateTime(toDateTime.Value.Year, toDateTime.Value.Month, toDateTime.Value.Day, 23, 59, 59);
            }

            return true;
        }
        

        public static DateTime? ToDateTime(this string value)
        {
            var culture = Thread.CurrentThread.CurrentCulture;
            DateTime vDateTime;
            if (DateTime.TryParse(value, culture, DateTimeStyles.None, out vDateTime))
                return vDateTime;

            return null;
        }

        public static Guid? ToGuid(this string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return null;

            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(Encoding.Default.GetBytes(value));
                var guid = new Guid(hash);
                return guid;
            }
        }

        public static byte[] GetBytes(this string value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : Encoding.UTF8.GetBytes(value);
        }

        public static string TrimNonAscii(this string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return value;

            var asciiEncoding = Encoding.GetEncoding("ISO-8859-1", new EncoderReplacementFallback(string.Empty), new DecoderReplacementFallback());
            return asciiEncoding.GetString(asciiEncoding.GetBytes(value));
        }
    }
}
