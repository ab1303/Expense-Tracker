using ETS.Core.Helpers;
using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.DomainCore.Mappings;
using ETS.DomainCore.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;

namespace ETS.DataCore.Implementations
{
    public class DataContext : IdentityDbContext<ApplicationUser>, IDataContext
    {
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<FieldCategoryMapping> FieldCategoryMappings { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }

        public static readonly LoggerFactory MyConsoleLoggerFactor = new LoggerFactory(new[]
        {
            new ConsoleLoggerProvider((category,level) => category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Information, true)
        });

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        readonly HashSet<long> _changeSet = new HashSet<long>(); // To handle unique Monitor Invoke
        private int _callCount = 0; // To handle recursive Monitor Invokes

        public override int SaveChanges()
        {
            // Incremented for every SaveChanges() call
            _callCount++;

            var principal = Thread.CurrentPrincipal;

            if (!principal.Identity.IsAuthenticated)
            {
                throw new UnauthorizedAccessException();
            }

            if (ChangeTracker.HasChanges())
            {
                var changedEntities = ChangeTracker.Entries<BaseEntity>().Where(e => e.State != EntityState.Unchanged).ToArray();
                var userLogin = principal.LoggedInUser();

                try
                {
                    foreach (var entity in changedEntities)
                    {
                        var validationContext = new ValidationContext(entity);
                        Validator.ValidateObject(entity, validationContext);

                        if (_changeSet.Contains(entity.GetHashCode())) continue;

                        switch (entity.State)
                        {
                            case EntityState.Added:
                                entity.Entity.CreateLogin = userLogin;
                                entity.Entity.DateCreated = DateTimeProvider.Now;
                                break;
                            case EntityState.Deleted:
                            case EntityState.Detached:
                            case EntityState.Modified:
                                entity.Entity.UpdateLogin = userLogin;
                                entity.Entity.DateChanged = DateTimeProvider.Now;
                                break;
                        }

                        _changeSet.Add(entity.GetHashCode());

                    }
                }
                catch (ValidationException e)
                {
                    // Helper of finding data formatting error in your seeds
                    var sb = new StringBuilder();

                    sb.AppendLine(
                            string.Format("Entity has the following validation errors \"{0}\" :",
                                e.ValidationResult));

                    //_log.Fatal(sb.ToString(), e);
                    throw new ValidationException(sb.ToString(), e);
                }

            }

            // If 1, then this is Parent SaveChange() and valid to proceed
            if (_callCount != 1)
            {
                _callCount--;
                return 0;
            }

            try
            {
                return base.SaveChanges();
            }
            catch (Exception exception)
            {

                throw;
            }
            finally
            {
                _changeSet.Clear();
                _callCount = 0;
            }

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // TPH Classes
            builder.Entity<IndividualExpense>();
            builder.Entity<GroupExpense>();

            // Mapping Classes
            builder.ApplyConfiguration(new IndividualExpenseMap());
            builder.ApplyConfiguration(new GroupExpenseMap());
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder
                .UseLoggerFactory(MyConsoleLoggerFactor)
                .EnableSensitiveDataLogging(true);


            base.OnConfiguring(optionsBuilder);
        }
    }
}
