using System;

namespace ETS.Services.Interfaces.ChangeTracking
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        void BeginTransaction();
        void SaveAndCommitTransaction();
        void CommitTransaction();
        void RollBackTransaction();
        //TODO: Abdul, Why is UserId a string instead of long.... ????
        string UserId { get; set; }
        void DisableTenantFilter();
        void EnableTenantFilter();
    }
}
