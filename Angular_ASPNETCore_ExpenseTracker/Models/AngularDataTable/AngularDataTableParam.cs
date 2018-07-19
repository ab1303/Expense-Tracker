using ETS.Service.DTO;

namespace Angular_ASPNETCore_ExpenseTracker.Models.AngularDataTable
{
    public class AngularDataTableParam
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortColumnName { get; set; }
        public SortOrder SortOrder { get; set; }
    }
}
