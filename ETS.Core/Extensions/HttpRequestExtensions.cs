using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Web;

namespace ETS.Core.Extensions
{
    public static class HttpRequestExtensions
    {
        //public static string GetCurrentFileName(this HttpRequest request)
        //{
        //    var fileName = request.FilePath.Substring(request.FilePath.LastIndexOf("/", StringComparison.Ordinal) + 1);

        //    if (!Path.HasExtension(fileName) && request.FilePath.IndexOf("legacy", StringComparison.InvariantCultureIgnoreCase) >= 0)
        //    {
        //        fileName = string.Format("{0}.aspx", fileName);
        //    }

        //    return fileName;
        //}

        //public static string GetCurrentFileName(this HttpRequestBase request)
        //{
        //    var fileName = request.FilePath.Substring(request.FilePath.LastIndexOf("/", StringComparison.Ordinal) + 1);

        //    if (!Path.HasExtension(fileName) && request.FilePath.IndexOf("legacy", StringComparison.InvariantCultureIgnoreCase) >= 0)
        //    {
        //        fileName = string.Format("{0}.aspx", fileName);
        //    }

        //    return fileName;
        //}
    }
}
