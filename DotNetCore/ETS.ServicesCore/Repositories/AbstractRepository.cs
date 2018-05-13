using ETS.DataCore.Implementations;
using ETS.DataCore.Intefaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Linq.Expressions;

namespace ETS.Services.Repositories
{
    public abstract class AbstractRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected internal DataContext Context;
        protected internal readonly DbSet<TEntity> DbSet;

        protected AbstractRepository(IDataContext context)
        {
            Context = context as DataContext;
            Contract.Assert(Context != null);
            DbSet = Context.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> Get()
        {
            return DbSet;
        }

        public virtual TEntity FindById(object id)
        {
            return DbSet.Find(id);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            var isDetached = Context.Entry(entityToUpdate).State == EntityState.Detached;
            if (isDetached) DbSet.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public virtual void Insert(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            var entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (Context.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
        }

        //TODO: Migrate this function
        public void Detach(TEntity entity)
        {
            //((IObjectContextAdapter)Context).ObjectContext.Detach(entity);
        }

        public void DeleteWhere(Expression<Func<TEntity, bool>> predicate = null)
        {
            DbSet.RemoveRange(predicate != null ? DbSet.Where(predicate) : DbSet);
        }
    }
}
