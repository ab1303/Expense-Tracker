using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETS.Core.Extensions
{
    public static class DecimalExtensions
    {
        public static decimal ToDecimal(this string value)
        {
            if (String.IsNullOrWhiteSpace(value))
                return 0.0m;

            decimal convertedValue;
            Decimal.TryParse(value.Trim(), out convertedValue);

            return convertedValue;
        }

        public static decimal ToDecimal(this object value)
        {
            return ToDecimal(value.ToString());
        }

        public static string ToString(this decimal? value, string format)
        {
            return !value.HasValue ? default(decimal).ToString(format) : value.Value.ToString(format);
        }

        public static decimal RoundOff(this decimal? value)
        {
            return value?.RoundOff() ?? 0.00M;
        }

        public static decimal RoundOff(this decimal value, int precision = 2)
        {
            return Math.Round(value, precision, MidpointRounding.AwayFromZero);
        }
    }
}
