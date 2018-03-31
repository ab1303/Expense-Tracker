using System;
using System.IO;

namespace ETS.Core.Helpers
{
    public class ContentFileHelper
    {
        public static string GetContentFileName(string fileName, string contentName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                throw new ArgumentNullException("fileName", "Invalid fileName.");

            if (string.IsNullOrWhiteSpace(contentName))
                throw new ArgumentNullException("contentName", "Invalid contentName.");

            return string.Format("pagecontent/{0}/{1}", fileName.Replace(".", "/").ToLower(), contentName);
        }

        public static string GetContentFileName(string controller, string action, string contentName)
        {
            if (string.IsNullOrWhiteSpace(controller))
                throw new ArgumentNullException("controller", "Invalid controller.");

            if (string.IsNullOrWhiteSpace(action))
                throw new ArgumentNullException("action", "Invalid action.");

            if (string.IsNullOrWhiteSpace(contentName))
                throw new ArgumentNullException("contentName", "Invalid contentName.");

            return string.Format("pagecontent/{0}/{1}/{2}", controller.ToLower(), action.ToLower(), contentName);
        }


        public static bool IsImage(string fileName)
        {
            var ext = Path.GetExtension(fileName);

            if (ext == null)
                return false;

            switch (ext.ToLower())
            {
                case ".jpg":
                case ".jpeg":
                case ".gif":
                case ".bmp":
                case ".png":
                    return true;
            }
            return false;
        }
    }
}
