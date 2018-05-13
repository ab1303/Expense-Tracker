namespace ETS.Jobs.Request
{
    public interface IProcessMonthlyExpenseFileUploadRequest : IRequestHandler<ProcessMonthlyExpenseFileUploadRequest>
    {
    }

    public class ProcessMonthlyExpenseFileUploadRequest : AbstractRequest
    {
        public string FileName { get; set; }
    }
}
