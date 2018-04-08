using ETS.DomainCore.Model;

namespace ETS.Domain
{
    public class UserDetail : BaseEntity
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Mobile { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
        public string IdentityId { get; set; }
        public ApplicationUser Identity { get; set; }
    }
}
