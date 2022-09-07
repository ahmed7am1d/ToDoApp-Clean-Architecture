using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.Services.Authentication;

namespace ToDo.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            return services;
        }
    }
}