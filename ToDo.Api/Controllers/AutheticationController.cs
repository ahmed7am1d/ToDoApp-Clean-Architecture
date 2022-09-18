using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Authentication.Commands.Register;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Authentication.Queries;
using ToDo.Contracts.Authentication.Requests;
using ToDo.Contracts.Authentication.Responses;
using ToDo.Domain.Common.Errors;

namespace ToDo.Api.Controllers
{

    [Route("auth")]
    [AllowAnonymous]
    //[ErrorHandlingFilter]
    public class AuthenticationController : ApiController
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public AuthenticationController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            //mapping request to command (var command will be register command filled from request)
            var command = _mapper.Map<RegisterCommand>(registerRequest);
            var authResult = await _mediator.Send(command);

            return authResult.Match(
                authResult => Ok(_mapper.Map<AutheticationResponse>(authResult)),
                //passing the list of errors to the Problem method in the ApiController
                errors => Problem(errors));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            //mapping request to query (var query will be login query filled from request)
            var query = _mapper.Map<LoginQuery>(loginRequest);
            var authResult = await _mediator.Send(query);

            if (authResult.IsError && authResult.FirstError == Errors.Authentication.InvalidCredentials)
            {
                //even we specified the method Proble we can still use the Problem method from the base class of asp.net core
                return Problem(statusCode: StatusCodes.Status401Unauthorized, title: authResult.FirstError.Description);
            }

            return authResult.Match(
                    authResult => Ok(_mapper.Map<AutheticationResponse>(authResult)),
                    errors => Problem(errors)
            );
        }
    }
}