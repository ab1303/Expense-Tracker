using System;
using System.Text;

namespace UGC.Core.Extensions
{
    public static class Strings
    {
        public static string Chr(int asciiValue)
        {
            if (asciiValue > 255)
                throw new ArgumentOutOfRangeException("asciiValue", asciiValue, "asciiValue must be between 0 and 255.");
            return Encoding.Default.GetString(new[] { (byte)asciiValue });
        }

        public static string ToChar(this int asciiValue)
        {
            return Chr(asciiValue);
        }
    }
}