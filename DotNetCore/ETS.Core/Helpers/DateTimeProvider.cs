using ETS.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace ETS.Core.Helpers
{
    public static class DateTimeProvider
    {
        #region Default implementation

        private class Default : IDateTimeProvider
        {
            private const string DefaultTimeZoneId = "AUS Eastern Standard Time";
            private const string PstTimeZoneId = "Pacific Standard Time";

            DateTime IDateTimeProvider.Now
            {
                get
                {
                    return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById(DefaultTimeZoneId));
                }
            }

            DateTime IDateTimeProvider.ConvertTimeFromPst(DateTime pstDateTime)
            {
                return TimeZoneInfo.ConvertTime(pstDateTime, TimeZoneInfo.FindSystemTimeZoneById(PstTimeZoneId), TimeZoneInfo.FindSystemTimeZoneById(DefaultTimeZoneId));
            }

            DateTime IDateTimeProvider.ConverTimeFromUtc(DateTime utcDateTime)
            {
                return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, TimeZoneInfo.FindSystemTimeZoneById(DefaultTimeZoneId));
            }

            DateTime IDateTimeProvider.ConverTimeToUtc(DateTime dateTime)
            {
                return TimeZoneInfo.ConvertTimeToUtc(dateTime, TimeZoneInfo.FindSystemTimeZoneById(DefaultTimeZoneId));
            }

            DateTime IDateTimeProvider.ParseDateTime(string dateTime, DateTimeFormat dateTimeFormat)
            {
                switch (dateTimeFormat)
                {
                    case DateTimeFormat.yyyyMMdd:
                        return DateTime.ParseExact(dateTime, "yyyyMMdd", CultureInfo.InvariantCulture);
                    case DateTimeFormat.yyyyMMddHHmmss:
                        return DateTime.ParseExact(dateTime, "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
                    case DateTimeFormat.ddmmyyyyhhmm:
                        return DateTime.ParseExact(dateTime, "ddMMyyyyHHmm", CultureInfo.InvariantCulture);
                    default://case DateTimeFormat.ddMMyyyyHHmmss:
                        return DateTime.ParseExact(dateTime, "ddMMyyyyHHmmss", CultureInfo.InvariantCulture);
                }

            }
        }

        #endregion

        private static IDateTimeProvider _instance = new Default();

        public static DateTime Today
        {
            get { return _instance.Now.Date; }
        }

        public static DateTime Now
        {
            get { return _instance.Now; }
        }

        public static DayOfWeek FirstDayOfWeek
        {
            get
            {
                var culture = CultureInfo.GetCultureInfo("en-AU");
                return culture.DateTimeFormat.FirstDayOfWeek;
            }
        }

        public static DateTime ConvertTimeFromPst(DateTime pstDateTime)
        {
            return _instance.ConvertTimeFromPst(pstDateTime);
        }

        public static DateTime ConverTimeFromUtc(DateTime utcDateTime)
        {
            return _instance.ConverTimeFromUtc(utcDateTime);
        }

        public static DateTime ConverTimeToUtc(DateTime dateTime)
        {
            return _instance.ConverTimeToUtc(dateTime);
        }

        public static void SetDefaultProvider(IDateTimeProvider provider)
        {
            _instance = provider;
        }

        public static void SetDefaultProvider()
        {
            _instance = new Default();
        }

        public static DateTime ParseDateTime(string dateTime, DateTimeFormat dateTimeFormat = DateTimeFormat.ddmmyyyyhhmmss)
        {
            return _instance.ParseDateTime(dateTime, dateTimeFormat);
        }


    }
}
