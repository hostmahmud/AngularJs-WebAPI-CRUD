using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi4.Models;

namespace WebApi2.Models
{
    public class Register
    {
        public Register()
        {
            this.Tickets = new HashSet<Tickets>();
        }

        public int Id { get; set; }
        public string UserType { get; set; }
        public string AccType { get; set; }
        public string TeamSize { get; set; }
        public string AccName { get; set; }
        public string AccPlan { get; set; }
        public string BusinessName { get; set; }
        public string BusinessType { get; set; }
        public string Description { get; set; }
        public string ImageName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        //nav
        public virtual ICollection<Tickets> Tickets { get; set; }
    }
}
