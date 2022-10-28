using ErrorOr;
using MediatR;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Common.Services;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Common.Errors;
using ToDo.Application.Common.Interfaces.Authentication;

namespace ToDo.Application.Authentication.Queries
{
    public class RefreshTokenQueryHandler : IRequestHandler<RefreshTokenQuery, ErrorOr<AuthenticationResult>>
    {
        private readonly IUserContext _userContext;
        private readonly IUserRepository _userRepositroy;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IDateTimeProvider _dateTimeProvider;


        public RefreshTokenQueryHandler(IUserContext userContext, IUserRepository userRepositroy, IJwtTokenGenerator jwtTokenGenerator, IDateTimeProvider dateTimeProvider)
        {
            _userContext = userContext;
            _userRepositroy = userRepositroy;
            _jwtTokenGenerator = jwtTokenGenerator;
            _dateTimeProvider = dateTimeProvider;
        }



        public async Task<ErrorOr<AuthenticationResult>> Handle(RefreshTokenQuery request, CancellationToken cancellationToken)
        {
            //[1]-- Get the current user by the refresh token 
            var user = _userRepositroy.GetUserByRefreshToken(request.RefreshToken);

            //[2]-- Check that the sended refresh token should be equal to the database once (user found)
            if (user is null)
                return new[] { Errors.Authentication.InvalidRefreshToken };

            else if (user.TokenExpires < DateTime.Now)
                return new[] { Errors.Authentication.TokenExpired };
            
            //Generate new access token for the user + refresh token
            var jwtToken = _jwtTokenGenerator.GenerateToken(user);
            var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();
            //Set new refresh token for the user
            _userRepositroy.SetUserRefereshToken(refreshToken, user, _dateTimeProvider.UtcNow, _dateTimeProvider.RefreshTokenExipryTime);
            //send the result back to the user
            return new AuthenticationResult(
                user,
                jwtToken,
                refreshToken,
                 _dateTimeProvider.UtcNow,
                _dateTimeProvider.RefreshTokenExipryTime
            );
        }
    }
}