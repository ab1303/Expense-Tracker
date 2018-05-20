using System;

namespace ETS.Core.Interfaces
{

    public interface IDateTimeProvider
    {
        DateTime Now { get; }

        DateTime ConvertTimeFromPst(DateTime pstDateTime);
        DateTime ConverTimeFromUtc(DateTime utcDateTime);
        DateTime ConverTimeToUtc(DateTime DateTime);
        DateTime ParseDateTime(string dateTime, DateTimeFormat dateTimeFormat);
    }

    public enum DateTimeFormat
    {
        ddmmyyyyhhmmss = 0,
        ddmmyyyyhhmm = 1,
        yyyyMMdd = 2,
        yyyyMMddHHmmss = 3
    }
}
