using System;

namespace ETS.Core.Extensions
{
    public static class DbNullExtensions
    {
        /// <summary>
        /// Only applicable for DataRow value
        /// </summary>
        /// <param name="dataObject"></param>
        /// <returns></returns>
        public static bool IsDbNull(this object dataObject)
        {
            if (dataObject == null)
                return false;

            return dataObject == DBNull.Value;
        }
    }
}
