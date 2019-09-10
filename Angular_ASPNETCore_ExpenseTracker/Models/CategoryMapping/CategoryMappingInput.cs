using ETS.DomainCore.Enums;

namespace Angular_ASPNETCore_ExpenseTracker.Models.CategoryMapping
{
    public class CategoryMappingInput
    {
        public FieldCategory FieldCategory { get; set; }

        public string Source { get; set; }

        public string Target { get; set; }
    }
}
