namespace ETS.Service.DTO
{
    public class PagedListArgs
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string SortBy { get; set; }
        public SortOrder SortOrder { get; set; }

        public PagedListArgs()
        {
            SortOrder = SortOrder.Asc;
            PageNumber = 0;
            SortBy = null;
        }
        
    }

    public enum SortOrder
    {
        Asc = 0,
        Desc = 1
    }
}
