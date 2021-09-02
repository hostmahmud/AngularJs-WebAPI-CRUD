using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi4.Migrations
{
    public partial class addTicketReply : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TicketReplies",
                columns: table => new
                {
                    TicketRepliesId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplyBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TicketId = table.Column<int>(type: "int", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false,defaultValue:DateTime.Now)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketReplies", x => x.TicketRepliesId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TicketReplies");
        }
    }
}
