namespace ETS.Jobs.Request
{
    public interface IProcessMonthlyExpenseFileUploadRequest : IRequestHandler<ProcessMonthlyExpenseFileUploadRequest>
    {
    }

    public class ProcessMonthlyExpenseFileUploadRequest : AbstractRequest
    {
        public string FileUri { get; set; }
    }
}
