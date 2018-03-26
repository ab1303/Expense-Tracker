using System;
using System.Collections.Generic;
using System.Linq;

namespace UGC.Core.Helpers
{
    public static class ExceptionHelper
    {
        public static IEnumerable<TSource> FromHierarchy<TSource>(
            this TSource source,
            Func<TSource, TSource> nextItem,
            Func<TSource, bool> canContinue)
        {
            for (var current = source; canContinue(current); current = nextItem(current))
            {
                yield return current;
            }
        }

        public static IEnumerable<TSource> FromHierarchy<TSource>(
            this TSource source,
            Func<TSource, TSource> nextItem)
            where TSource : class
        {
            return FromHierarchy(source, nextItem, s => s != null);
        }

        public static string GetAllInnerExceptionMessages(this Exception exception)
        {
            var messages = exception.FromHierarchy(ex => ex.InnerException)
                .Select(ex => ex.Message);
            return string.Join(Environment.NewLine, messages);
        }

        public static string GetAllInnerExceptionStackTrace(this Exception exception)
        {
            var messages = exception.FromHierarchy(ex => ex.InnerException)
                .Select(ex => ex.StackTrace);
            return string.Join(Environment.NewLine, messages);
        }
    }
}
