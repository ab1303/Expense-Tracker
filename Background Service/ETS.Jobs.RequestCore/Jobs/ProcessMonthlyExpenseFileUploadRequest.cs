using ETS.Jobs.Request;

namespace ETS.Jobs.RequestCore.Jobs
{
    public interface IProcessMonthlyExpenseFileUploadRequest : IRequestHandler<ProcessMonthlyExpenseFileUploadRequest>
    {
    }

    public class ProcessMonthlyExpenseFileUploadRequest : AbstractRequest
    {
        public string FileName { get; set; }
    }
}
