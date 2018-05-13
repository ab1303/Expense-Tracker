using Angular_ASPNETCore_Jobs.Controllers;
using ETS.Azure;
using ETS.DataCore;
using ETS.Jobs.ServiceCore;
using ETS.JobsHost.Core;
using ETS.Services;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ETS.JobsHost
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private void RegisterApplicationServices(IServiceCollection services)
        {
            services.RegisterDatabaseService();
            services.RegisterInternalServices();
            services.RegisterAzureStorageService();
            services.RegisterBackgroundJobServices();

        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHangfire(x => x.UseSqlServerStorage(Configuration.GetConnectionString("DataConnection")));

            // Add MVC Framework Services.
            services.AddMvc();

            //Following line is only required if your jobs are failing.
            RegisterApplicationServices(services);
        }

        public void Configure(IApplicationBuilder app,
           IHostingEnvironment env,
           ILoggerFactory loggerFactory)
        {
            app.UseStaticFiles();

            app.ConfigureHangfire(loggerFactory);
           
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }

      

    }
}
