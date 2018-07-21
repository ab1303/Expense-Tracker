using ETS.Services.Repositories;

namespace ETS.Service.Services
{
    public class QueryService: IQueryService
    {
        private readonly IRepositories _repositories;
        public QueryService(IRepositories repositories)
        {
            _repositories = repositories;
        }

        public T[] Execute<T>(IQuery<T> query, out int totalCount) => query.GetResults(_repositories,  out totalCount);
        public T Execute<T>(IQueryModel<T> query) => query.GetResult(_repositories);
      
    }
}
