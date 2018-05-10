using Microsoft.Extensions.Configuration;

namespace Cyrisk.JobsHost
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
    }
}
