using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoGarage.BL.Handlers
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.CookieHttpOnly = true;
                options.CookieName = ".Session";
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseSession();
        }
    }
}
