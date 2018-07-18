
namespace ETS.Service.Services
{
    public interface IQueryService
    {
        T[] Execute<T>(IQuery<T> query, out int totalCount);
        T Execute<T>(IQueryModel<T> query);
    }
}
