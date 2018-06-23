using ETS.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ETS.DomainCore.Mappings
{
    public class IndividualExpenseMap : IEntityTypeConfiguration<IndividualExpense>
    {
        public void Configure(EntityTypeBuilder<IndividualExpense> builder)
        {
        }
    }
}
