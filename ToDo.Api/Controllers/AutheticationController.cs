using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Services.Authentication;
using ToDo.Application.Services.Authentication.Commands;
using ToDo.Application.Services.Authentication.Common;
using ToDo.Application.Services.Authentication.Queries;
using ToDo.Contracts.Authentication.Requests;
using ToDo.Contracts.Authentication.Responses;
using ToDo.Domain.Common.Errors;

namespace ToDo.Api.Controllers
{
    
    [Route("auth")]
    //[ErrorHandlingFilter]
    public class AutheticationController : ApiController
    {
        private readonly IAuthenticationCommandService _authenticationCommandService;
        private readonly IAuthenticationQueryService _authenticationQueryService;

        public AutheticationController(IAuthenticationCommandService authenticationCommandService, IAuthenticationQueryService authenticationQueryService)
        {
            _authenticationCommandService = authenticationCommandService;
            _authenticationQueryService = authenticationQueryService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest registerRequest)
        {
            ErrorOr<AuthenticationResult> authResult = _authenticationCommandService.Register(registerRequest.FirstName,
                registerRequest.LastName,
                registerRequest.Email,
                registerRequest.Password,
                registerRequest.PhoneNumber);

            return authResult.Match(
                authResult => Ok(MapAuthResult(authResult)),
                //passing the list of errors to the Problem method in the ApiController
                errors => Problem(errors)
            );
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var authResult = _authenticationQueryService.Login(
                loginRequest.Email,
                loginRequest.Password);

           if(authResult.IsError && authResult.FirstError == Errors.Authentication.InvalidCredentials)
            {
                //even we specified the method Proble we can still use the Problem method from the base class of asp.net core
                return Problem(statusCode:StatusCodes.Status401Unauthorized,title:authResult.FirstError.Description);
            }

            return authResult.Match(
                authResult => Ok(MapAuthResult(authResult)),
                errors => Problem(errors)
            );
        }

        private static AutheticationResponse MapAuthResult(AuthenticationResult authResult)
        {
            return new AutheticationResponse(
                authResult.User.Id,
                authResult.User.FirstName,
                authResult.User.LastName,
                authResult.User.Email,
                authResult.User.PhoneNumber,
                authResult.Token);
        }
    }
}