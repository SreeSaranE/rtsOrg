using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class application3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewStatus",
                table: "ApplicationHistory");

            migrationBuilder.DropColumn(
                name: "OldStatus",
                table: "ApplicationHistory");

            migrationBuilder.AddColumn<int>(
                name: "NewStage",
                table: "ApplicationHistory",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OldStage",
                table: "ApplicationHistory",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewStage",
                table: "ApplicationHistory");

            migrationBuilder.DropColumn(
                name: "OldStage",
                table: "ApplicationHistory");

            migrationBuilder.AddColumn<string>(
                name: "NewStatus",
                table: "ApplicationHistory",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OldStatus",
                table: "ApplicationHistory",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
