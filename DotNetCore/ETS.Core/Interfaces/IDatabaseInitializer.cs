using System;
using System.Collections.Generic;
using System.Text;

namespace ETS.Core.Interfaces
{
    public interface IDatabaseInitializer
    {
        void UpdateDatabaseIfHasUpdates();

        void UpdateDatabaseToVersion(string version);

        void ConditionalDropAndRecreate(bool seedDemoData);

        IEnumerable<string> GetPendingMigrations();


    }
}
