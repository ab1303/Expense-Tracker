using ETS.DataCore.Intefaces;
using Microsoft.EntityFrameworkCore;

namespace ETS.DataCore.Implementations
{
    public interface IBackgroundServiceDataContext: IDataContext
    {
    }

    public class BackgroundServiceDataContext : DataContext, IBackgroundServiceDataContext
    {

        public BackgroundServiceDataContext(DbContextOptions<DataContext> options) : base(options, null)
        {

        }

        protected override string LoggedInUser()
        {
            return "Background Service";
        }
    }
}
