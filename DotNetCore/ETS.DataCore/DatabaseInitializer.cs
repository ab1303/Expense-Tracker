using ETS.Core.Interfaces;
using ETS.DataCore.Seeders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Collections.Generic;

namespace ETS.DataCore.Implementations
{
    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly DataContext _dataContext;
        private readonly DatabaseSeeder _seeder;
        private readonly IMigrator _migrator;

        //TODO Structure Map mapping
        public DatabaseInitializer(DataContext context, DatabaseSeeder seeder, IMigrator migrator)
        {
            _dataContext = context;
            _seeder = seeder;
            this._migrator = migrator;
        }

        public void UpdateDatabaseIfHasUpdates()
        {
            // TODO: DatabaseInitializer 
            //if (string.IsNullOrWhiteSpace(Thread.CurrentPrincipal.LoggedInUser()))
            //{
            //    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity("Db Admin", "Forms"), new[] { "DBA" });
            //}

            _dataContext.Database.Migrate();
        }

        public void ConditionalDropAndRecreate(bool seedDemoData)
        {
            using (_dataContext)
            {
                _dataContext.Database.EnsureDeleted();

                UpdateDatabaseIfHasUpdates();

                if (seedDemoData) _seeder.SeedAsync(_dataContext);

            }
        }

        public void UpdateDatabaseToVersion(string version)
        {
            _migrator.Migrate(version);
        }

        public IEnumerable<string> GetPendingMigrations()
        {
            return _dataContext.Database.GetPendingMigrations();
        }

    }
}
