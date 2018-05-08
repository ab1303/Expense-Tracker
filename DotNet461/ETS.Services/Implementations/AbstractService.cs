using ETS.Services.Interfaces;
using ETS.Services.Repositories;

namespace ETS.Services.Implementations
{
    public class AbstractService<TEntity> : IService<TEntity> where TEntity : class
    {
        private readonly IRepository<TEntity> _repository;

        public AbstractService(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public virtual TEntity GetById(object id)
        {
            return _repository.FindById(id);
        }

        public virtual void Create(TEntity entity)
        {
            _repository.Insert(entity);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            _repository.Delete(entityToDelete);
        }

        public virtual void Edit(TEntity entity)
        {
            _repository.Update(entity);
        }

        public virtual void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
