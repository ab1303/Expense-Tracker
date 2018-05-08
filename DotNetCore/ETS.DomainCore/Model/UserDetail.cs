using ETS.DomainCore.Model;

namespace ETS.Domain
{
    public class UserDetail : BaseEntity
    {
        public long Id { get; set; }
        public string Location { get; set; }
        public string Gender { get; set; }
        public string IdentityId { get; set; }
        public ApplicationUser Identity { get; set; }
    }
}
