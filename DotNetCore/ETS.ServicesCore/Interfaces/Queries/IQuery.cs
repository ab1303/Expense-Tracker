using ETS.Service.DTO;
using ETS.Services.Interfaces.ChangeTracking;
using ETS.Services.Repositories;
using System.Linq;

namespace ETS.Service.Services
{
    public interface IQueryModel<out T>
    {
        T GetResult(IRepositories repositories, IUnitOfWork unitOfWork);
    }

    public interface IQueryableModel<out T>
    {
        IQueryable<T> GetQueryableResult(IRepositories repositories, IUnitOfWork unitOfWork);
    }

    public interface IQuery<out T>
    {        
        T[] GetResults(IRepositories repositories, IUnitOfWork unitOfWork, out int totalFound);
    }

    public interface IPagedQuery<out T>: IQuery<T>
    {
        PagedListArgs PagedListArgs { get; }
        bool ReturnAllResults { get; }
        
    }

}
