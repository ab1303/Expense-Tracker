using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Angular_ASPNETCore_ExpenseTracker.Helper
{
    public static class HtmlHelper
    {
        public static SelectListItem[] ToListItems<TEntity>(this IEnumerable<TEntity> collection, Func<TEntity, string> text, Func<TEntity, string> value, bool prependBlank = false)
        {
            var items = new List<SelectListItem>();

            if (prependBlank)
                items.Add(new SelectListItem { Text = "", Value = "" });

            items.AddRange(collection.Select(x => new SelectListItem { Text = text(x), Value = value(x) }));

            return items.ToArray();
        }

        public static SelectListItem[] ToListItems<TEntity>(this IEnumerable<TEntity> collection, Func<TEntity, string> text, Func<TEntity, string> value, Func<TEntity, string> group)
        {
            var items = new List<SelectListItem>();

            var groupedItems = collection.GroupBy(@group);

            foreach (var groupedItem in groupedItems)
            {
                var optGroup = new SelectListGroup { Name = groupedItem.Key };
                items.AddRange(collection.Where(x => group(x) == groupedItem.Key).Select(x => new SelectListItem { Text = text(x), Value = value(x), Group = optGroup }));
            }

            return items.ToArray();
        }

        public static SelectListItem[] ToListItems<TEntity>(this IEnumerable<TEntity> collection, Func<TEntity, string> text, Func<TEntity, string> value, string firstItemText, bool? ignoreOrderBy = true)
        {
            var items = new List<SelectListItem>
            {
                new SelectListItem{Text = firstItemText,Value = ""}
            };

            if (ignoreOrderBy.HasValue && ignoreOrderBy.Value)
            {
                items.AddRange(collection.Select(x => new SelectListItem { Text = text(x), Value = value(x) }));
            }
            else
            {
                items.AddRange(collection.Select(x => new SelectListItem { Text = text(x), Value = value(x) }).OrderBy(x => x.Text));
            }

            return items.ToArray();
        }

        public static SelectListItem[] ToListItems<TEntity>(this IEnumerable<TEntity> collection, Func<TEntity, string> text, Func<TEntity, string> value, Func<TEntity, bool> selected)
        {
            var items = new List<SelectListItem>();

            items.AddRange(collection.Select(x => new SelectListItem { Text = text(x), Value = value(x), Selected = selected(x) }).OrderBy(x => x.Text));

            return items.ToArray();
        }

    }
}
