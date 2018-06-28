using ETS.DomainCore.Enums;
using ETS.Services.Repositories;
using System;
using System.Linq;

namespace ETS.Jobs.ServiceCore
{
    public class TransactionMapping
    {
        private readonly IRepositories repositories;
        private readonly MonthlyExpenseFileImport importRecord;

        public TransactionMapping(IRepositories repositories, MonthlyExpenseFileImport importRecord)
        {
            this.repositories = repositories;
            this.importRecord = importRecord;
        }


        public void MapRecord()
        {
            var fieldCategoryMapping = repositories.FieldCategoryMapping.Get()
                                .SingleOrDefault(m => m.SourceValue == importRecord.PaidFor);

            if (fieldCategoryMapping == null) throw new ArgumentException($"{nameof(importRecord.PaidFor)}");

            if (fieldCategoryMapping.FieldCategory == FieldCategory.PaidByIndividual)
                IndividualExpenseMapping.Create(repositories, importRecord);


        }

    }

}
