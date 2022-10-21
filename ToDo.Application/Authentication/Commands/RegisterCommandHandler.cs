using ErrorOr;
using MediatR;
using ToDo.Application.Common.Interfaces.Authentication;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Entities;
using ToDo.Domain.Common.Errors;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Common.Services;

namespace ToDo.Application.Authentication.Commands.Register;

//WILL TAKE THE REGISTER REQUEST AND RETURN EITHER AUTHENTICATION RESULT OR A LIST OF ERRORS 
public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{

    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;
    private readonly IPasswordEncoder _passwordEncoder;
    /* This is the constructor for the AuthenticationService class. It is taking in two parameters, an
    IJwtTokenGenerator and an IUserRepository. */
    public RegisterCommandHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository, IPasswordEncoder passwordEncoder)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
        _passwordEncoder = passwordEncoder;
    }


    public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;
        //[1] Validate user does not exist
        if (_userRepository.GetUserByEmail(command.Email) is not null)
        {
            return Errors.User.DuplicateEmail;
        }
        //[2]Create user (generate unique Id) & Persist to DB & With hashed password
        //creation of the hashed password 

        var user = new User
        {
            FirstName = command.FirstName,
            LastName = command.LastName,
            Email = command.Email,
            Password = _passwordEncoder.GetHashedPassword(command.Password),
            PhoneNumber = command.PhoneNumber
        };
        _userRepository.Add(user);
        //[3] Create JWT token
        var token = _jwtTokenGenerator.GenerateToken(user);
        //[4] Return AuthenticationResult
        return new AuthenticationResult(user, token);
    }
}