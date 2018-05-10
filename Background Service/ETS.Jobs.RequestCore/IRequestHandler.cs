namespace ETS.Jobs.Request
{
    public interface IRequestHandler<in TRequest> where TRequest : AbstractRequest
    {
        void Handle(TRequest request);
    }
}
