using System.Collections.Immutable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using ToDo.Api.Common.Errors;
using ToDo.Api.Common.Mapping;
using ToDo.Infrastructure;

namespace ToDo.Api
{
    public static class DependencyInjection
    {
        
        public static IServiceCollection AddPresentation(this IServiceCollection services,WebApplicationBuilder builder)
        {
            //override the default problem details factory to use our custom problem details factory
            services.AddSingleton<ProblemDetailsFactory, ToDoProblemDetailsFactory>();
            //add cors policy to allow all origins and methods to be able to test the api from outside application (different port)
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000", "http://localhost:3000/", "https://localhost:3000/",
                        "localhost:3000/")
                           .AllowAnyMethod() 
                           .AllowAnyHeader()
                           .AllowCredentials();
                }));
            //scanning and mapping all various mapping configurations that we have
            services.AddMapping();
            services.AddControllers();
            //DbContext 
            services.AddDbContext<DataContext>(options=>{
                options.UseSqlServer(builder.Configuration.GetConnectionString("ToDoDB"),
                x => x.MigrationsAssembly("ToDo.Infrastructure"));
            });
            return services;
        }
    }
}