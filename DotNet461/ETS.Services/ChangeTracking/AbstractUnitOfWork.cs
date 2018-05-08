using ETS.Data;
using ETS.Services.Interfaces.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace ETS.Services.ChangeTracking
{
    //public abstract class AbstractUnitOfWork : IUnitOfWork
    //{
    //    private IDbContextTransaction _transaction;
    //    protected DataContext Context;
    //    private bool _disposed;

    //    public void Save()
    //    {
    //        Context.SaveChanges();
    //    }

    //    public void BeginTransaction()
    //    {
    //        if (_transaction?.UnderlyingTransaction.Connection == null) _transaction = Context.Database.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
    //    }

    //    public void SaveAndCommitTransaction()
    //    {
    //        Save();
    //        CommitTransaction();
    //    }

    //    public void CommitTransaction()
    //    {
    //        if (_transaction.UnderlyingTransaction.Connection != null)
    //            _transaction.Commit();
    //        _transaction.Dispose();
    //    }

    //    public void RollBackTransaction()
    //    {
    //        Context.RollBack();
    //        _transaction.Rollback();
    //    }

    //    public string UserId
    //    {
    //        get => Context.UserId;
    //        set => Context.UserId = value;
    //    }

    //    protected virtual void Dispose(bool disposing)
    //    {
    //        if (!_disposed)
    //        {
    //            if (disposing)
    //            {
    //                _transaction?.Dispose();
    //                Context.Dispose();
    //            }
    //        }
    //        _disposed = true;
    //    }

    //    public void Dispose()
    //    {
    //        Dispose(true);
    //        GC.SuppressFinalize(this);
    //    }
    //}
}
