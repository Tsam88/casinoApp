using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Docker.NetCore.MySql.Models
{
    public class MenuItem
    {
        public int Id { get; set; }

        [StringLength(25)]
        public string Name { get; set; }

        public int Order { get; set; }

        [StringLength(255)]
        public string Url { get; set; }
    }
}
