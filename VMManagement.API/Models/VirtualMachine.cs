using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VMManagement.API.Models
{
    public class VirtualMachine
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Cores { get; set; }
        [Required]
        public string Ram { get; set; }
        [Required]
        public string Disk { get; set; }
        [Required]
        public string Os { get; set; }
        [Required]
        public string Status { get; set; }

        [ForeignKey("Id")]
        public string RoleId { get; set; }
    }


}
