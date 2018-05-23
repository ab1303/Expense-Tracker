using ETS.Domain;
using ETS.DomainCore.Enums;

namespace ETS.DomainCore.Model
{
    public class FieldCategoryMapping : BaseEntity
    {
        public long Id { get; set; }
        public FieldCategory FieldCategory { get; set; }
        public string FieldCategoryString
        {
            get { return FieldCategory.ToString(); }
            private set { }
        }
        public string SourceValue { get; set; }
        public string Destination { get; set; }
        public string DestinationValue { get; set; }
    }
}
