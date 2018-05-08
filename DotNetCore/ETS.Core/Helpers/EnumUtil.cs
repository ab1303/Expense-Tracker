using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;

namespace ETS.Core.Helpers
{
    public static class EnumUtil
    {
        public static T? ToEnum<T>(this string value) where T : struct
        {
            T val;
            if (Enum.TryParse(value, out val))
            {
                return val;
            }

            return null;
        }

        public static string DisplayName(this IConvertible value)
        {
            if (value == null) return string.Empty;

            var enumType = value.GetType();
            var enumValue = Enum.GetName(enumType, value);
            if (enumValue == null) return String.Empty;


            var member = enumType.GetMember(enumValue)[0];

            var attrs = member.GetCustomAttributes(typeof(DisplayAttribute), false);

            if (!attrs.Any()) return Enum.GetName(enumType, value);

            var outString = ((DisplayAttribute)attrs[0]).Name;

            if (((DisplayAttribute)attrs[0]).ResourceType != null)
            {
                outString = ((DisplayAttribute)attrs[0]).GetName();
            }

            return outString;
        }


        public static T? DisplayNameToEnum<T>(this string displayName) where T : struct
        {
            if (string.IsNullOrWhiteSpace(displayName))
                return null;

            var enumType = typeof(T);

            var enumValues = Enum.GetValues(enumType);

            foreach (var val in enumValues)
            {
                if ((val as Enum).DisplayName() == displayName)
                    return (T?)val;
            }

            return null;
        }
        public static int GetValue(this Enum value)
        {
            if (value == null) return -1;

            return Convert.ToInt32(value);
        }

        public static IEnumerable<T> GetValues<T>()
        {
            return Enum.GetValues(typeof(T)).Cast<T>();
        }

        public static string[] GetEnumDisplayNames<T>() where T : struct, IConvertible
        {
            var displayList = new List<string>();
            //return Enum.GetNames(typeof(T)).Select(name => name.DisplayName()).ToArray();
            foreach (var name in Enum.GetNames(typeof(T)))
            {
                displayList.Add(((T)Enum.Parse(typeof(T), name)).DisplayName());
            }
            return displayList.ToArray();
        }


        public static Dictionary<int, string> GetEnumList<T>() where T : struct, IConvertible
        {
            var dict = new Dictionary<int, string>();
            foreach (var name in Enum.GetNames(typeof(T)))
            {
                dict.Add((int)Enum.Parse(typeof(T), name), ((T)Enum.Parse(typeof(T), name)).DisplayName());
            }

            return dict;
        }

        public static Dictionary<string, string> GetEnumValueList<T>() where T : struct, IConvertible
        {
            var dict = new Dictionary<string, string>();
            foreach (var name in Enum.GetNames(typeof(T)))
            {
                dict.Add(name, ((T)Enum.Parse(typeof(T), name)).DisplayName());
            }

            return dict;
        }
    }
}
