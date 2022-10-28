using ErrorOr;
using MediatR;
using ToDo.Application.Authentication.Common;

namespace ToDo.Application.Authentication.Queries;
public record RefreshTokenQuery
(
    string RefreshToken
) : IRequest<ErrorOr<AuthenticationResult>>;