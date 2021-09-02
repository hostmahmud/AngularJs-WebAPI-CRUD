using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi4.Models;

namespace WebApi2.Models
{
    public class ProjectDbContext:DbContext
    {
        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options)
        {

        }
        public DbSet<Register> Registers { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
        public DbSet<TicketReplies> TicketReplies { get; set; }
    }
}
