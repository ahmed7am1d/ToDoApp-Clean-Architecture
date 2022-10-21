using ErrorOr;
using MediatR;
using ToDo.Application.Common.Interfaces.Authentication;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Entities;
using ToDo.Domain.Common.Errors;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Common.Services;

namespace ToDo.Application.Authentication.Queries
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;
        private readonly IPasswordEncoder _passwordEncoder;

        public LoginQueryHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository, IPasswordEncoder passwordEncoder)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
            _passwordEncoder = passwordEncoder;
        }


        public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            //[1] Validate user exists and password is correct
            if (_userRepository.GetUserByEmail(query.Email) is not User user || user.Password != _passwordEncoder.GetHashedPassword(query.Password))
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
}