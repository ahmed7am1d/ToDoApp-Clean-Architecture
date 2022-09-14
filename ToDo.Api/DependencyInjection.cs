using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using ToDo.Api.Common.Errors;
using ToDo.Api.Common.Mapping;

namespace ToDo.Api
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            //override the default problem details factory to use our custom problem details factory
            services.AddSingleton<ProblemDetailsFactory, ToDoProblemDetailsFactory>();
            //add cors policy to allow all origins and methods to be able to test the api from outside application (different port)
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                }));
            //scanning and mapping all various mapping configurations that we have 
            services.AddMapping();
            services.AddControllers();
            return services;
        }
    }
}