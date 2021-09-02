using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApi4.ViewModels
{
    public class TicketsVM
    {
        public int Id { get; set; }
        [Required, StringLength(40)]
        public string Title { get; set; }
        public string Body { get; set; }
        public string Status { get; set; }
        public string Department { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public int AssignedUser { get; set; }
    }
}