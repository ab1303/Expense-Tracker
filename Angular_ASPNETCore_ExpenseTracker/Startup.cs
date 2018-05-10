using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.EntityFrameworkCore;
using ETS.Data;
using ETS.DataCore.Seeders;
using ETS.Core.Interfaces;
using ETS.Services.Implementations;
using Microsoft.AspNetCore.Identity;
using ETS.DomainCore.Model;
using System.Reflection;
using ETS.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Angular_ASPNETCore_ExpenseTracker.Infrastructure.Authentication;
using Angular_ASPNETCore_ExpenseTracker.Helper;
using FluentValidation.AspNetCore;
using AutoMapper;
using ETS.DataCore;
using ETS.Services.Interfaces.Repositories;
using ETS.Services.Repositories;
using ETS.Azure;

namespace Angular_ASPNETCore_Seed
{
    public class Startup
    {
        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private void ConfigureIdentity(IServiceCollection services)
        {

            services.AddIdentity<ApplicationUser, IdentityRole>()
                     .AddEntityFrameworkStores<DataContext>()
                     .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 6;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            //services.ConfigureApplicationCookie(options =>
            //{
            //    // Cookie settings
            //    options.Cookie.HttpOnly = true;
            //    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
            //    // If the LoginPath isn't set, ASP.NET Core defaults 
            //    // the path to /Account/Login.
            //    options.LoginPath = "/Account/Login";
            //    // If the AccessDeniedPath isn't set, ASP.NET Core defaults 
            //    // the path to /Account/AccessDenied.
            //    options.AccessDeniedPath = "/Account/AccessDenied";
            //    options.SlidingExpiration = true;
            //});


        }

        private void ConfigureJwtAuth(IServiceCollection services)
        {
            // jwt wire up
            // Get options from app settings
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });

            services.AddSingleton<IJwtFactory, JwtFactory>();
        }

        private void RegisterApplicationServices(IServiceCollection services)
        {
            services.AddTransient<DatabaseSeeder>();

            services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();
            services.AddScoped<IDataContext, DataContext>();

            services.AddScoped<IExpenseCategoryRepository, ExpenseCategoryRepository>();
            services.AddScoped<IRepositories, Repositories>();

            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IExpenseCategoryService, ExpenseCategoryService>();
            services.AddScoped<IFileStorage, FileStorage>();



        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //Add SQL Server support
            var migrationAssembly = typeof(DataContext).GetTypeInfo().Assembly.GetName().Name;
            services.AddDbContext<DataContext>(options => options.UseSqlServer(
                Configuration.GetConnectionString("DataConnection"),
                sql => sql.MigrationsAssembly(migrationAssembly)));

            // JWT Bearer
            ConfigureJwtAuth(services);

            // Identity and Authorization
            ConfigureIdentity(services);

            // Add Auto Mapper
            services.AddAutoMapper();

            // Angular's default header name for sending the XSRF token.
            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            // Add MVC Framework Services.
            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

          

            //Handle XSRF Name for Header
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
            });

            //https://github.com/domaindrivendev/Swashbuckle.AspNetCore
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "ASP.NET Core Customers API",
                    Description = "ASP.NET Core/Angular Swagger Documentation",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Abdul Wahab", Url = "http://github.com/ab1303" },
                    License = new License { Name = "MIT", Url = "https://en.wikipedia.org/wiki/MIT_License" }
                });

                //Add XML comment document by uncommenting the following
                // var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "MyApi.xml");
                // options.IncludeXmlComments(filePath);

            });

            // Add Application Services
            RegisterApplicationServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IHostingEnvironment env,
            IAntiforgery antiforgery,
            DatabaseSeeder databaseSeeder)
        {
            //Manually handle setting XSRF cookie. Needed because HttpOnly has to be set to false so that
            //Angular is able to read/access the cookie.
            app.Use((context, next) =>
            {
                if (context.Request.Method == HttpMethods.Get &&
                    (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase) ||
                     string.Equals(context.Request.Path.Value, "/home/index", StringComparison.OrdinalIgnoreCase)))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN",
                        tokens.RequestToken,
                        new CookieOptions() { HttpOnly = false });
                }

                return next();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            // Serve /node_modules as a separate root (for packages that use other npm modules client side)
            // Added for convenience for those who don't want to worry about running 'gulp copy:libs'
            // Only use in development mode!!
            app.UseFileServer(new FileServerOptions()
            {
                // Set root of file server
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
                RequestPath = "/node_modules",
                EnableDirectoryBrowsing = false
            });

            //This would need to be locked down as needed (very open right now)
            app.UseCors((corsPolicyBuilder) =>
            {
                corsPolicyBuilder.AllowAnyOrigin();
                corsPolicyBuilder.AllowAnyMethod();
                corsPolicyBuilder.AllowAnyHeader();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            // Visit http://localhost:5000/swagger
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                //Handle SPA routes so they can load client-side components correctly
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });

            });


            // Run seed on start up
            databaseSeeder.SeedAsync(app.ApplicationServices);

        }
    }
}
