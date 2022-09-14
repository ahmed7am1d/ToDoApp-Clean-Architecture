using ErrorOr;
using MediatR;
using ToDo.Application.Common.Interfaces.Authentication;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Entities;
using ToDo.Domain.Common.Errors;
using ToDo.Application.Authentication.Common;

namespace ToDo.Application.Authentication.Commands.Register;

//WILL TAKE THE REGISTER REQUEST AND RETURN EITHER AUTHENTICATION RESULT OR A LIST OF ERRORS 
public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{

    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;
    /* This is the constructor for the AuthenticationService class. It is taking in two parameters, an
    IJwtTokenGenerator and an IUserRepository. */
    public RegisterCommandHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }


    public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        await Task.CompletedTask;
        //[1] Validate user does not exist
        if (_userRepository.GetUserByEmail(command.Email) is not null)
        {
            return Errors.User.DuplicateEmail;
        }
        //[2]Create user (generate unique Id) & Persist to DB
        var user = new User
        {
            FirstName = command.FirstName,
            LastName = command.LastName,
            Email = command.Email,
            Password = command.Password,
            PhoneNumber = command.PhoneNumber
        };
        _userRepository.Add(user);
        //[3] Create JWT token
        var token = _jwtTokenGenerator.GenerateToken(user);
        //[4] Return AuthenticationResult
        return new AuthenticationResult(user, token);
    }
}