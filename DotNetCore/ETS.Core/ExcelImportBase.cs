using FileHelpers;
using System.Collections.Generic;

namespace ETS.Core
{
    public abstract class ExcelImportBase
    {
        public List<ExcelErrorItem> Errors { get; set; }

        protected ExcelImportBase()
        {
            Errors = new List<ExcelErrorItem>();
        }
    }

    [DelimitedRecord("|")]
    public class ExcelErrorItem
    {
        public uint RowIndex { get; set; }
        public string Column { get; set; }
        public string Error { get; set; }
    }

  
}
