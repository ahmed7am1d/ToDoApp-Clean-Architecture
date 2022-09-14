using Mapster;
using ToDo.Application.Authentication.Commands.Register;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Authentication.Queries;
using ToDo.Contracts.Authentication.Requests;
using ToDo.Contracts.Authentication.Responses;

namespace ToDo.Api.Common.Mapping
{
    public class AuthenticationMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RegisterRequest, RegisterCommand>();
            config.NewConfig<LoginRequest, LoginQuery>();
            //mapping from AuthenticationResult to AutheticationResponse
            config.NewConfig<AuthenticationResult, AutheticationResponse>()
            .Map(dest => dest , src => src.User);
        }
    }
}