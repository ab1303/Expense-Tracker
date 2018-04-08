using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ETS.DataCore.Migrations
{
    public partial class UserDetail_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FacebookId",
                table: "UserDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdentityId",
                table: "UserDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "UserDetails",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserDetails_IdentityId",
                table: "UserDetails",
                column: "IdentityId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserDetails_AspNetUsers_IdentityId",
                table: "UserDetails",
                column: "IdentityId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserDetails_AspNetUsers_IdentityId",
                table: "UserDetails");

            migrationBuilder.DropIndex(
                name: "IX_UserDetails_IdentityId",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "FacebookId",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "IdentityId",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "UserDetails");
        }
    }
}
