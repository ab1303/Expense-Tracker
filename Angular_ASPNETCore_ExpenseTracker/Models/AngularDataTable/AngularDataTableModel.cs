namespace Angular_ASPNETCore_ExpenseTracker.Models.AngularDataTable
{
    public class AngularDataTableModel
    {
        /// <summary>
        /// Data
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Total records count
        /// </summary>
        public int RecordsTotal { get; set; }

        /// <summary>
        /// Page Size
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Pages
        /// </summary>
        public int Pages { get; set; }
    }
}
