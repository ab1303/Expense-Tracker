namespace ETS.Core.Extensions
{
    public static class BooleanExtensions
    {
        public static bool ToBoolean(this object value)
        {
            if (value == null)
                return false;

            bool result;

            bool.TryParse(value.ToString(), out result);

            return result;
        }
    }
}
