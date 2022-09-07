using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ToDo.Api.Filters;
using ToDo.Application.Services.Authentication;
using ToDo.Contracts.Authentication.Requests;
using ToDo.Contracts.Authentication.Responses;

namespace ToDo.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    //[ErrorHandlingFilter]
    public class AutheticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        public AutheticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest registerRequest)
        {
            var authResult = _authenticationService.Register(registerRequest.FirstName, registerRequest.LastName, registerRequest.Email, registerRequest.Password, registerRequest.PhoneNumber);
            var response = new AutheticationResponse (authResult.User.Id, authResult.User.FirstName, authResult.User.LastName, authResult.User.Email, authResult.User.PhoneNumber, authResult.Token);
            return Ok(response);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var authResult = _authenticationService.Login(loginRequest.Email, loginRequest.Password);
            var response = new AutheticationResponse (authResult.User.Id, authResult.User.FirstName, authResult.User.LastName, authResult.User.Email, authResult.User.PhoneNumber, authResult.Token);
            return Ok(response);
        }
    }
}