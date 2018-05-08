namespace ETS.Domain
{
    public class ExpenseCategory:BaseEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
