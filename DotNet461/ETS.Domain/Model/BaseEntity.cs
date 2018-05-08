using System;
using System.ComponentModel.DataAnnotations;

namespace ETS.Domain
{
    public class BaseEntity
    {
        [Required]
        public DateTime DateCreated { get; set; }

        public DateTime? DateChanged { get; set; }

        [Required, MaxLength(100)]
        public string CreateLogin { get; set; }

        [MaxLength(100)]
        public string UpdateLogin { get; set; }
    }
}
