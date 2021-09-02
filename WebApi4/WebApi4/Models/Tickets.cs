using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApi2.Models;

namespace WebApi4.Models
{
    public class Tickets
    {
        public int TicketsId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Status { get; set; }
        public string Department { get; set; }
        public DateTime Date { get; set; }
        public string FileName { get; set; }
        [ForeignKey("Register")]
        public int AssignedUser { get; set; }

        public virtual Register Register { get; set; }

    }
}
