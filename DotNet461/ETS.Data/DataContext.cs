using ETS.Domain;
using Microsoft.EntityFrameworkCore;

namespace ETS.Data
{
    public class DataContext:DbContext
    {
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = @"Data Source=(LocalDb)\MSSQLLocalDB;Initial Catalog=ETS-DB;Integrated Security=True";

            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
