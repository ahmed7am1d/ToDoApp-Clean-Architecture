using System.Reflection;
using ErrorOr;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using ToDo.Application.Authentication.Commands;
using ToDo.Application.Authentication.Commands.Register;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Common.Behaviors;

namespace ToDo.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(typeof(DependencyInjection).Assembly);
            services.AddScoped<IPipelineBehavior<RegisterCommand,ErrorOr<AuthenticationResult>>, ValidateRegisterCommandBehavior>();
            //services.AddScoped<IValidator<RegisterCommand>, RegisterCommandValidator>();
            //we don't want to add every validator to the DI container, so we will use the extension method below
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}