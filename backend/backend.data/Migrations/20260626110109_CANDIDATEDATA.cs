using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class CANDIDATEDATA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "stage",
                table: "Candidates",
                newName: "Stage");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOdBirth",
                table: "Candidates",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOdBirth",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "Education",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "Summary",
                table: "Candidates");

            migrationBuilder.RenameColumn(
                name: "Stage",
                table: "Candidates",
                newName: "stage");
        }
    }
}
