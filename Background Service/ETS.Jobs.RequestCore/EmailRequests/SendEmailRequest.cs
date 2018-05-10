
namespace ETS.Jobs.Request.EmailRequests
{
    public interface ISendEmailRequest : IRequestHandler<SendEmailRequest>
    {
    }


    public class SendEmailRequest : AbstractRequest
    {
        public string Message { get; set; }
    }
}
