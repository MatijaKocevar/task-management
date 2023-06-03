using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace task_management.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Tasks",
                nullable: false,
                defaultValueSql: "GETDATE()"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "CreatedAt", table: "YourEntityTableName");
        }
    }
}
