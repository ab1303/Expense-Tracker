using ETS.DataCore;
using ETS.Domain;
using ETS.DomainCore.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace ETS.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>, IDataContext
    {
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Transaction> Transactions { get; set; }


        public static readonly LoggerFactory MyConsoleLoggerFactor = new LoggerFactory(new[]
        {
            new ConsoleLoggerProvider((category,level) => category == DbLoggerCategory.Database.Command.Name && level == LogLevel.Information, true)
        });

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

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
