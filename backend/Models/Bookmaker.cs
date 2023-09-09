using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Docker.NetCore.MySql.Models
{
    public class Bookmaker
    {
        public int Id { get; set; }

        [StringLength(30)]
        public string Name { get; set; }

        [StringLength(30)]
        public string Code { get; set; }

        public decimal Price { get; set; }

        [StringLength(30)]
        public string ButtonText { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        [StringLength(255)]
        public string Logo { get; set; }

        [StringLength(255)]
        public string Url { get; set; }

        public bool Primary { get; set; }
    }
}
