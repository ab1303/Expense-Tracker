using ETS.Services.Results;
using System.Threading.Tasks;

namespace ETS.Services.Interfaces
{
    public interface IAccountService
    {
        Task<ServiceResult> RegisterUser(string identityId, string location);
    }
}
