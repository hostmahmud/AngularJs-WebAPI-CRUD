using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi4.Migrations
{
    public partial class modifyReplyBody : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Body",
                table: "TicketReplies",
                newName: "ReplyBody");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReplyBody",
                table: "TicketReplies",
                newName: "Body");
        }
    }
}
