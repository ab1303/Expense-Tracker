namespace ETS.Services.Interfaces
{
    public interface IService<TEntity> where TEntity : class
    {
        TEntity GetById(object id);
        void Create(TEntity entity);
        void Delete(TEntity entityToDelete);
        void Edit(TEntity entity);
        void Delete(long id);
    }
}
