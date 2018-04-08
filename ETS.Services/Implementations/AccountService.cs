using ETS.Data;
using ETS.Domain;
using ETS.Services.Interfaces;
using ETS.Services.Results;
using System;
using System.Threading.Tasks;

namespace ETS.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;

        public AccountService(DataContext context)
        {
            _context = context;
        }

        public async Task<ServiceResult> RegisterUser(string identityId)
        {

            await _context.UserDetails.AddAsync(new UserDetail { IdentityId = identityId });
            await _context.SaveChangesAsync();

            try
            {

                await _context.UserDetails.AddAsync(new UserDetail { IdentityId = identityId });
                await _context.SaveChangesAsync();


                return new ServiceResult
                {
                    Status = ServiceStatus.Success
                };

            }
            catch (Exception ex)
            {
                return new ServiceResult
                {
                    Exception = ex
                };
            }
        }

        private object Task<T>(T serviceResult)
        {
            throw new NotImplementedException();
        }
    }
}
