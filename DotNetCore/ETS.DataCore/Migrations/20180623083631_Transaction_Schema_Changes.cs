using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ETS.DataCore.Migrations
{
    public partial class Transaction_Schema_Changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_UserDetails_PaidForId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "PaidForId",
                table: "Transactions",
                newName: "IndividualExpense_PaidForId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_PaidForId",
                table: "Transactions",
                newName: "IX_Transactions_IndividualExpense_PaidForId");

            migrationBuilder.AddColumn<long>(
                name: "PaidForId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Transactions",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_PaidForId",
                table: "Transactions",
                column: "PaidForId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_UserGroups_PaidForId",
                table: "Transactions",
                column: "PaidForId",
                principalTable: "UserGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_UserDetails_IndividualExpense_PaidForId",
                table: "Transactions",
                column: "IndividualExpense_PaidForId",
                principalTable: "UserDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_UserGroups_PaidForId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_UserDetails_IndividualExpense_PaidForId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_PaidForId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "PaidForId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "IndividualExpense_PaidForId",
                table: "Transactions",
                newName: "PaidForId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_IndividualExpense_PaidForId",
                table: "Transactions",
                newName: "IX_Transactions_PaidForId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_UserDetails_PaidForId",
                table: "Transactions",
                column: "PaidForId",
                principalTable: "UserDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
