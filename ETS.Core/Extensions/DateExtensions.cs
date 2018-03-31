using System;
using System.Globalization;

namespace ETS.Core.Extensions
{
    public static class DateExtensions
    {
        public static bool IsFirstDayOfWeek(this DateTime value)
        {
            var culture = CultureInfo.GetCultureInfo("en-AU");
            return (value.DayOfWeek == culture.DateTimeFormat.FirstDayOfWeek);
        }

        //Format to e.g. 23-JUN-2018
        public static string ToDateDisplayString(this DateTime dateTime)
        {
            return dateTime.ToString("dd-MMM-yyyy");
        }

        public static string ToDateDisplayString(this DateTime? dateTime)
        {
            return !dateTime.HasValue ? string.Empty : dateTime.Value.ToString("dd-MMM-yyyy");
        }

        public static string ToDateTimeDisplayString(this DateTime dateTime)
        {
            return dateTime.ToString("dd-MMM-yyyy HH:mm:ss");
        }

        public static string ToDateTimeDisplayString(this DateTime? dateTime)
        {
            return !dateTime.HasValue ? string.Empty : dateTime.Value.ToString("dd-MMM-yyyy HH:mm:ss");
        }

        public static string ToCardExpiryDateDisplayString(this DateTime dateTime)
        {
            return dateTime.ToString("MM/yyyy");
        }

        public static string ToCardExpiryDateDisplayString(this DateTime? dateTime)
        {
            return !dateTime.HasValue ? string.Empty : dateTime.Value.ToString("MM/yyyy");
        }

        public static string ToDateTimeMilliSecondsDisplayString(this DateTime dateTime)
        {
            return dateTime.ToString("dd-MMM-yyyy HH:mm:ss.fff");
        }

        public static string ToDateTimeMilliSecondsDisplayString(this DateTime? dateTime)
        {
            return !dateTime.HasValue ? string.Empty : dateTime.Value.ToString("dd-MMM-yyyy HH:mm:ss.fff");
        }

        /// <summary> 
        /// Format input DateTime object to 24 hour time format. 
        /// It's an extension method of DateTime type
        /// Example: 15th April 2015 2.12 pm will be formatted as 14:12:00
        /// </summary>
        /// <param name="dateTime">An object of DateTime type</param>
        /// <returns></returns>
        public static string ToTimeDisplayString(this DateTime dateTime)
        {
            return dateTime.ToString("HH:mm:ss");
        }

        public static string GetYearMonthString(this DateTime dateTime)
        {
            return dateTime.ToString("yyyyMM");
        }

        public static string GetYearMonthString(this DateTime? dateTime)
        {
            return !dateTime.HasValue ? string.Empty : dateTime.Value.GetYearMonthString();
        }

        public static string GetGreetingMessage(this DateTime dateTime)
        {
            var hours = dateTime.Hour;
            var message = string.Empty;

            if (hours >= 0 && hours < 12)
            {
                message = "Good morning";

            }
            else if (hours >= 12 && hours < 17)
            {
                message = "Good afternoon";

            }
            else if (hours >= 17 && hours < 24)
            {
                message = "Good evening";
            }

            return message;
        }

        public static string GetGreetingMessage()
        {
            return GetGreetingMessage(DateTime.Now);
        }

        public static string ToODataString(this DateTime dateTime)
        {
            return dateTime.ToString("yyyy'-'MM'-'ddTHH':'mm':'ss'Z'");
        }

        public static string ToODataString(this DateTime? dateTime)
        {
            return dateTime.HasValue ? dateTime.Value.ToODataString() : null;
        }
    }
}
