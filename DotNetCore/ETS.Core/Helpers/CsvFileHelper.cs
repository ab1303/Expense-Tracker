using FileHelpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace ETS.Core.Helpers
{
    public static class CsvFileHelper
    {
        public static byte[] GenerateDelimitedCsv<T>(this IEnumerable<T> exportItems) where T : class
        {
            byte[] bytes;

            using (var stream = new MemoryStream())
            {
                using (var sWriter = new StreamWriter(stream))
                {
                    var engine = new DelimitedFileEngine<T>(Encoding.UTF8)
                    {
                        HeaderText = typeof(T).GetCsvHeader()
                    };
                    engine.WriteStream(sWriter, exportItems);
                    sWriter.Flush();
                }

                bytes = stream.ToArray();
            }

            return bytes;
        }

        public static string GetCsvHeader(this Type type)
        {
            return string.Join(",", type.GetFieldTitles());
        }

        public static IEnumerable<string> GetFieldTitles(this Type type)
        {
            var fields = (from field in type.GetFields(
                            BindingFlags.GetField |
                            BindingFlags.Public |
                            BindingFlags.NonPublic |
                            BindingFlags.Instance)
                          select field).ToList();

            var list = new List<KeyValuePair<int, string>>();

            foreach (var field in fields)
            {
                var attributes = field.GetCustomAttributes(true);
                var index = fields.IndexOf(field);

                var orderAttribute = attributes.OfType<FieldOrderAttribute>().SingleOrDefault();
                if (orderAttribute != null)
                    index = orderAttribute.GetOrder() - 1;

                var title = field.GetName();

                var titleAttribute = attributes.OfType<FieldTitleAttribute>().SingleOrDefault();
                if (titleAttribute != null)
                    title = titleAttribute.Name;

                list.Add(new KeyValuePair<int, string>(index > 0 ? index : 0, title));
            }

            return list.OrderBy(x => x.Key).Select(x => x.Value);
        }

        private static int GetOrder(this FieldOrderAttribute attribute)
        {
            // Hack cos FieldOrderAttribute.Order is internal (why?)
            var pi = typeof(FieldOrderAttribute)
                .GetProperty("Order",
                    BindingFlags.GetProperty |
                    BindingFlags.Instance |
                    BindingFlags.NonPublic);

            return (int)pi.GetValue(attribute, null);
        }

        private static string GetName(this FieldInfo field)
        {
            return field.Name.Replace("<", string.Empty).Replace(">k__BackingField", string.Empty);
        }

        public static T[] ReadDelimitedCsv<T>(this string csvString) where T : class
        {
            var engine = new FileHelperEngine<T>();
            return engine.ReadString(csvString);
        }
    }

    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    public class FieldTitleAttribute : Attribute
    {
        public FieldTitleAttribute(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            Name = name;
        }

        public string Name { get; private set; }
    }
}
