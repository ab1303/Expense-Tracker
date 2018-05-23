using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ETS.DataCore.Migrations
{
    public partial class Add_table_UserGroup_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_UserDetails_UserDetailId",
                table: "UserGroups");

            migrationBuilder.DropIndex(
                name: "IX_UserGroups_UserDetailId",
                table: "UserGroups");

            migrationBuilder.DropColumn(
                name: "UserDetailId",
                table: "UserGroups");

            migrationBuilder.AddColumn<long>(
                name: "UserGroupId",
                table: "UserDetails",
                nullable: true,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_UserGroupId",
                table: "UserDetails",
                column: "UserGroupId");

            migrationBuilder.AddForeignKey(
                   name: "FK_UserDetails_UserGroups_UserGroupId",
                   table: "UserDetails",
                   column: "UserGroupId",
                   principalTable: "UserGroups",
                   principalColumn: "Id",
                   onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserDetails_UserGroups_UserGroupId",
                table: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_UserDetails_UserGroupId",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "UserGroupId",
                table: "UserDetails");

            migrationBuilder.AddColumn<long>(
                name: "UserDetailId",
                table: "UserGroups",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_UserDetailId",
                table: "UserGroups",
                column: "UserDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_UserDetails_UserDetailId",
                table: "UserGroups",
                column: "UserDetailId",
                principalTable: "UserDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
