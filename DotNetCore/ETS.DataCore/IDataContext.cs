using ETS.Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace ETS.DataCore.Intefaces
{
    public interface IDataContext : IDisposable
    {
        DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        DbSet<UserDetail> UserDetails { get; set; }
        DbSet<Transaction> Transactions { get; set; }
    }
}
