using System.Collections.Generic;

namespace ETS.Services.DTO.Reports
{
    public class ReportGroupDTO
    {
        public GroupedTotalDTO Category { get; set; }
        public IEnumerable<ReportGroupDTO> SubCategories { get; set; }
    }
}
