using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi4.Models
{
    public class TicketReplies
    {
        public int TicketRepliesId { get; set; }
        public string ReplyBody { get; set; }
        public string ReplyBy { get; set; }
        public int TicketsId { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
