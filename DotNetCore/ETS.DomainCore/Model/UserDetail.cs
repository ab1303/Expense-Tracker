using ETS.DomainCore.Model;

namespace ETS.Domain
{
    public class UserDetail : BaseEntity
    {
        public long Id { get; set; }
        public string Location { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; } // Change it to Enumeration
        public string IdentityId { get; set; }
        public virtual ApplicationUser Identity { get; set; }

        public long? UserGroupId { get; set; }
        public virtual UserGroup UserGroup { get; set; }

    }
}
