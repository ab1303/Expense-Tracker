using ETS.Domain;

namespace ETS.DomainCore.Model
{
    public class UserGroup : BaseEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
