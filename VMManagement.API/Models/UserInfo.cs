using System.ComponentModel.DataAnnotations;

namespace VMManagement.API.Models
{
    public class UserInfo
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
