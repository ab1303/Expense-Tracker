using System;
using System.Collections.Generic;
using System.Text;
using ETS.Services.DTO.Reports;

namespace ETS.Services.Interfaces
{
    public interface IReportingService
    {
        IEnumerable<ReportGroupDTO> ExpenseCategoryReport();
    }
}
