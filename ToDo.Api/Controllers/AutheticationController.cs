using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Authentication.Commands.Register;
using ToDo.Application.Authentication.Queries;
using ToDo.Contracts.Authentication.Requests;
using ToDo.Contracts.Authentication.Responses;

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
            var command = _mapper.Map<RegisterCommand>(registerRequest);
            var authResult = await _mediator.Send(command);

            return authResult.Match(
                authResult => Ok(_mapper.Map<AutheticationResponse>(authResult)),
                errors => Problem(errors));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            //mapping request to query (var query will be login query filled from request)
            var query = _mapper.Map<LoginQuery>(loginRequest);
            var authResult = await _mediator.Send(query);


            if (!authResult.IsError)
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = authResult.Value.Expires,
                    IsEssential = true,
                    Secure= false
                };
                Response.Cookies.Append("refreshToken", authResult.Value.RefreshToken, cookieOptions);
                return Ok(_mapper.Map<AutheticationResponse>(authResult.Value));
            }
            return Problem(authResult.Errors);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var authResult = await _mediator.Send(new RefreshTokenQuery(refreshToken));

            if (!authResult.IsError) {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = authResult.Value.Expires
                };
                Response.Cookies.Append("refreshToken", authResult.Value.RefreshToken, cookieOptions);
                return Ok(_mapper.Map<AutheticationResponse>(authResult.Value));
            }
            return Problem(authResult.Errors);
        }
    }
}