using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ETS.DataCore.Migrations
{
    public partial class Sprint2_Add_Table_Payslip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaySlips",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreateLogin = table.Column<string>(maxLength: 100, nullable: false),
                    DateChanged = table.Column<DateTime>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Frequency = table.Column<int>(nullable: false),
                    FrequencyString = table.Column<string>(nullable: true),
                    NetEarnings = table.Column<decimal>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    SuperAnnuation = table.Column<decimal>(nullable: false),
                    TotalEarnings = table.Column<decimal>(nullable: false),
                    UpdateLogin = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaySlips", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaySlips");
        }
    }
}
