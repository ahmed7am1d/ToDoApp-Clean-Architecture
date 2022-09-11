using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.Services.Authentication;
using ToDo.Application.Services.Authentication.Commands;
using ToDo.Application.Services.Authentication.Queries;

namespace ToDo.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationCommandService, AuthenticationCommandService>();
            services.AddScoped<IAuthenticationQueryService, AuthenticationQueryService>();
            return services;
        }
    }
}