using ETS.Domain.Enums;
using ETS.Service.DTO;
using ETS.Service.Services;
using ETS.Services.Repositories;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace ETS.Services.Queries
{
    public class UsersIndexQuery : IPagedQuery<UsersIndexQuery.Result>
    {
        private NgxDataTableArgs _pagedListArgs;
        public bool ReturnAllResults { get; set; }
       
        public UsersIndexQuery()
        {
            ReturnAllResults = false;
            _pagedListArgs = new NgxDataTableArgs();
        }

        public IPagedQuery<Result> SetPage(NgxDataTableArgs pageInfo)
        {
            _pagedListArgs = new NgxDataTableArgs
            {
                PageNumber = pageInfo.PageNumber,
                PageSize = pageInfo.PageSize,
            };

            return this;
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
                query.OrderBy(orderBy).Skip(_pagedListArgs.PageSize * _pagedListArgs.PageNumber).Take(_pagedListArgs.PageSize).ToArray();

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
