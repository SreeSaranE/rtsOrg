using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class application2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_Candidates_CandidateId",
                table: "Interviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_Users_InterviewerId",
                table: "Interviews");

            migrationBuilder.RenameColumn(
                name: "CandidateId",
                table: "Interviews",
                newName: "JobApplicationId");

            migrationBuilder.RenameIndex(
                name: "IX_Interviews_CandidateId",
                table: "Interviews",
                newName: "IX_Interviews_JobApplicationId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Interviews",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_JobApplications_JobApplicationId",
                table: "Interviews",
                column: "JobApplicationId",
                principalTable: "JobApplications",
                principalColumn: "JobApplicationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_Users_InterviewerId",
                table: "Interviews",
                column: "InterviewerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_JobApplications_JobApplicationId",
                table: "Interviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_Users_InterviewerId",
                table: "Interviews");

            migrationBuilder.RenameColumn(
                name: "JobApplicationId",
                table: "Interviews",
                newName: "CandidateId");

            migrationBuilder.RenameIndex(
                name: "IX_Interviews_JobApplicationId",
                table: "Interviews",
                newName: "IX_Interviews_CandidateId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Interviews",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_Candidates_CandidateId",
                table: "Interviews",
                column: "CandidateId",
                principalTable: "Candidates",
                principalColumn: "CandidateId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_Users_InterviewerId",
                table: "Interviews",
                column: "InterviewerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
