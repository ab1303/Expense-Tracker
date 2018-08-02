using ETS.Domain.Enums;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.Repositories;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;

namespace ETS.Services.Queries
{
    public class UsersIndexQuery : IPagedQuery<UsersIndexQuery.Result>
    {
        public PagedListArgs PagedListArgs { get; }
        public bool ReturnAllResults { get; }

        public UsersIndexQuery(bool returnAllResults = true)
        {
            ReturnAllResults = returnAllResults;
        }

        public Result[] GetResults(IRepositories repositories, out int totalFound)
        {

            var query = from u in repositories.UserDetail.Get()
                        join ug in repositories.UserGroup.Get()
                        on u.UserGroupId equals ug.Id
                        select new Result
                        {
                            Id = u.Id,
                            FirstName = u.FirstName,
                            LastName = u.LastName,
                            Gender = u.Gender == "M" ? Gender.Male : Gender.Female,
                            Location = u.Location,
                            GroupId = ug.Id,
                            GroupName = ug.Name,
                            DateCreated = u.DateCreated
                        };

            totalFound = query.Count();

            var orderBy = $"{DefaultSortBy.DateCreated} {"DESC"}";

            var results = ReturnAllResults ? query.OrderBy(orderBy).ToArray() :
                query.OrderBy(orderBy).Skip(PagedListArgs.PageSize * PagedListArgs.PageNumber).Take(PagedListArgs.PageSize).ToArray();

            return results;

        }

        public class Result
        {
            public long Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Location { get; set; }
            public long GroupId { get; set; }
            public string GroupName { get; set; }
            public DateTime DateCreated { get; set; }
            public Gender Gender { get; set; }
        }

        public static class DefaultSortBy
        {
            public const string DateCreated = "DateCreated";
        }
    }
}
