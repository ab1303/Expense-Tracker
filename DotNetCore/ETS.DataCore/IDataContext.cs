using ETS.Domain;
using ETS.DomainCore.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace ETS.DataCore.Intefaces
{
    public interface IDataContext : IDisposable
    {
        DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        DbSet<UserDetail> UserDetails { get; set; }
        DbSet<Transaction> Transactions { get; set; }
        DbSet<FieldCategoryMapping> FieldCategoryMappings { get; set; }
        DbSet<UserGroup> UserGroups { get; set; }
        DbSet<PaySlip> PaySlips { get; set; }

        int SaveChanges();
    }
}
