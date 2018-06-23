using ETS.DataCore.Intefaces;
using ETS.Domain;
using ETS.DomainCore.Mappings;
using ETS.DomainCore.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

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
