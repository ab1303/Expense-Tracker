using ETS.Services.Interfaces.ChangeTracking;
using ETS.Services.Repositories;

namespace ETS.Service.Services
{
    public class QueryService: IQueryService
    {
        private readonly IRepositories _repositories;
        private readonly IUnitOfWork _unitOfWork;
        public QueryService(IRepositories repositories, IUnitOfWork unitOfWork)
        {
            _repositories = repositories;
            _unitOfWork = unitOfWork;
        }

        public T[] Execute<T>(IQuery<T> query, out int totalCount) => query.GetResults(_repositories, _unitOfWork, out totalCount);
        public T Execute<T>(IQueryModel<T> query) => query.GetResult(_repositories, _unitOfWork);
      
    }
}
