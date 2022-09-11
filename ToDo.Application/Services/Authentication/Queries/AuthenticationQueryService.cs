using ErrorOr;
using ToDo.Application.Common.Errors;
using ToDo.Application.Common.Interfaces.Authentication;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Application.Services.Authentication.Common;
using ToDo.Domain.Common.Errors;
using ToDo.Domain.Entities;
namespace ToDo.Application.Services.Authentication.Queries;

public class AuthenticationQueryService : IAuthenticationQueryService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;
    /* This is the constructor for the AuthenticationService class. It is taking in two parameters, an
    IJwtTokenGenerator and an IUserRepository. */
    public AuthenticationQueryService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }


    /// <summary>
    /// This function takes in a string email and a string password and returns an AuthenticationResult
    /// </summary>
    /// <param name="email">The email address of the user.</param>
    /// <param name="password">"password"</param>
    public ErrorOr<AuthenticationResult> Login(string email, string password)
    {
        //[1] Validate user exists and password is correct
        if (_userRepository.GetUserByEmail(email) is not User user || user.Password != password)
        {
            return new[] { Errors.Authentication.InvalidCredentials };
        }

        //[2] Create JWT token
        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult(
         user,
         token);
    }
}