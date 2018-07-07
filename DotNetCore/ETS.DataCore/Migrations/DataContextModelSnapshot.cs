﻿// <auto-generated />
using ETS.DataCore.Implementations;
using ETS.Domain.Enums;
using ETS.DomainCore.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;

namespace ETS.DataCore.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ETS.Domain.ExpenseCategory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreateLogin")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime?>("DateChanged");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<string>("UpdateLogin")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("ExpenseCategories");
                });

            modelBuilder.Entity("ETS.Domain.Transaction", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<long>("CategoryId");

                    b.Property<string>("CreateLogin")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime?>("DateChanged");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Details");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<int>("Frequency");

                    b.Property<string>("FrequencyString");

                    b.Property<string>("Name");

                    b.Property<long>("PaidById");

                    b.Property<DateTime>("TransactionDate");

                    b.Property<string>("UpdateLogin")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PaidById");

                    b.ToTable("Transactions");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Transaction");
                });

            modelBuilder.Entity("ETS.Domain.UserDetail", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreateLogin")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime?>("DateChanged");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<string>("IdentityId");

                    b.Property<string>("LastName");

                    b.Property<string>("Location");

                    b.Property<string>("UpdateLogin")
                        .HasMaxLength(100);

                    b.Property<long?>("UserGroupId");

                    b.HasKey("Id");

                    b.HasIndex("IdentityId");

                    b.HasIndex("UserGroupId");

                    b.ToTable("UserDetails");
                });

            modelBuilder.Entity("ETS.DomainCore.Model.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<long?>("FacebookId");

                    b.Property<string>("FullName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("PictureUrl");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("ETS.DomainCore.Model.FieldCategoryMapping", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreateLogin")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime?>("DateChanged");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Destination");

                    b.Property<string>("DestinationValue");

                    b.Property<int>("FieldCategory");

                    b.Property<string>("FieldCategoryString");

                    b.Property<string>("SourceValue");

                    b.Property<string>("UpdateLogin")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("FieldCategoryMappings");
                });

            modelBuilder.Entity("ETS.DomainCore.Model.UserGroup", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreateLogin")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime?>("DateChanged");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Name");

                    b.Property<string>("UpdateLogin")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("ETS.Domain.GroupExpense", b =>
                {
                    b.HasBaseType("ETS.Domain.Transaction");

                    b.Property<long>("PaidForId");

                    b.HasIndex("PaidForId");

                    b.ToTable("GroupExpense");

                    b.HasDiscriminator().HasValue("GroupExpense");
                });

            modelBuilder.Entity("ETS.Domain.IndividualExpense", b =>
                {
                    b.HasBaseType("ETS.Domain.Transaction");

                    b.Property<long>("PaidForId")
                        .HasColumnName("IndividualExpense_PaidForId");

                    b.HasIndex("PaidForId");

                    b.ToTable("IndividualExpense");

                    b.HasDiscriminator().HasValue("IndividualExpense");
                });

            modelBuilder.Entity("ETS.Domain.Transaction", b =>
                {
                    b.HasOne("ETS.Domain.ExpenseCategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ETS.Domain.UserDetail", "PaidBy")
                        .WithMany()
                        .HasForeignKey("PaidById")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ETS.Domain.UserDetail", b =>
                {
                    b.HasOne("ETS.DomainCore.Model.ApplicationUser", "Identity")
                        .WithMany()
                        .HasForeignKey("IdentityId");

                    b.HasOne("ETS.DomainCore.Model.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("ETS.DomainCore.Model.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("ETS.DomainCore.Model.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ETS.DomainCore.Model.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("ETS.DomainCore.Model.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ETS.Domain.GroupExpense", b =>
                {
                    b.HasOne("ETS.DomainCore.Model.UserGroup", "PaidFor")
                        .WithMany()
                        .HasForeignKey("PaidForId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ETS.Domain.IndividualExpense", b =>
                {
                    b.HasOne("ETS.Domain.UserDetail", "PaidFor")
                        .WithMany()
                        .HasForeignKey("PaidForId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
