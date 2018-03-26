using ETS.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ETS.DataCore
{
    public interface IDataContext : IDisposable
    {
        DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        DbSet<UserDetail> UserDetails { get; set; }
        DbSet<Transaction> Transactions { get; set; }
    }
}
