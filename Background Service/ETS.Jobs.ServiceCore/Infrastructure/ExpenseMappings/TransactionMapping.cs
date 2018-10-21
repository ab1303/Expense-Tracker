using ETS.DataCore.Implementations;
using ETS.Domain;
using ETS.DomainCore.Enums;
using ETS.Services.Repositories;
using System;
using System.Linq;
using ETS.Services.Interfaces.Repositories;

namespace ETS.Jobs.ServiceCore
{

    public interface ITransactionMapping
    {
        Transaction MapRecord(MonthlyExpenseFileImport importRecord);
    }

    public class TransactionMapping : ITransactionMapping
    {
        private readonly IRepositories repositories;

        public TransactionMapping(IRepositories repositories)
        {
            this.repositories = repositories;
        }


        public Transaction MapRecord(MonthlyExpenseFileImport importRecord)
        {
            var fieldCategoryMapping = repositories.FieldCategoryMapping.Get()
                                .SingleOrDefault(m => m.SourceValue == importRecord.PaidFor);

            if (fieldCategoryMapping == null) throw new ArgumentException($"{nameof(importRecord.PaidFor)}");

            if (fieldCategoryMapping.FieldCategory == FieldCategory.PaidForIndividual)
                return IndividualExpenseMapping.Create(repositories, importRecord);

            return GroupExpenseMapping.Create(repositories, importRecord);

        }

    }

}
