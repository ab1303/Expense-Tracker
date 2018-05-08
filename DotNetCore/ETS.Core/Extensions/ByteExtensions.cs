using System.IO;
using System.Text;

namespace ETS.Core.Extensions
{
    public static class ByteExtensions
    {
        public static string GetString(this byte[] bytes, Encoding encoding = null)
        {
            encoding = encoding ?? Encoding.UTF8;
            return bytes == null ? null : encoding.GetString(bytes);
        }

        public static byte[] GetBytes(this Stream stream)
        {
            if (stream.GetType() == typeof(MemoryStream))
                return ((MemoryStream)stream).ToArray();

            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
