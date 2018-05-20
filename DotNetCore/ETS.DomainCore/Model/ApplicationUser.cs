using Microsoft.AspNetCore.Identity;

namespace ETS.DomainCore.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
    }
}
