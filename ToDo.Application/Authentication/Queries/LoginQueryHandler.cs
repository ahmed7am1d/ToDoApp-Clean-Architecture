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
        private readonly IDateTimeProvider _dateTimeProvider;

        public LoginQueryHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository, IPasswordEncoder passwordEncoder, IDateTimeProvider dateTimeProvider = null)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
            _passwordEncoder = passwordEncoder;
            _dateTimeProvider = dateTimeProvider;
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
            //[3] Generate refresh token
            try
            {
                var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();
                _userRepository.SetUserRefereshToken(refreshToken, user, _dateTimeProvider.UtcNow, _dateTimeProvider.RefreshTokenExipryTime);
                return new AuthenticationResult(
                 user,
                 token,
                 refreshToken,
                 _dateTimeProvider.UtcNow,
                 _dateTimeProvider.RefreshTokenExipryTime
                 );
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            //[4] Update user refresh token (set the refresh token)
            return new AuthenticationResult(user,
                 token,
                 "2424",
                 _dateTimeProvider.UtcNow,
                 _dateTimeProvider.RefreshTokenExipryTime);
        }
    }
}