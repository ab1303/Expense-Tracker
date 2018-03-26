using System;

namespace UGC.Core.Extensions
{
    public static class DoubleExtensions
    {
        public static double RoundOff(this double value, int precision = 2)
        {
            return Math.Round(value, precision, MidpointRounding.AwayFromZero);
        }
    }
}
