namespace ETS.Service.DTO
{
    public class NgxDataTableArgs
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string SortBy { get; set; }
        public SortOrder SortOrder { get; set; }

        public NgxDataTableArgs()
        {
            SortOrder = SortOrder.Asc;
            PageNumber = 0;
            SortBy = null;
            PageSize = 20;
        }
        
    }

    public enum SortOrder
    {
        Asc = 0,
        Desc = 1
    }
}
