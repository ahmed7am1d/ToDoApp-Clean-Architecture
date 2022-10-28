using ErrorOr;

namespace ToDo.Domain.Common.Errors;
public static partial class Errors
{
    public static class Authentication
    {
        public static Error InvalidCredentials => Error.Validation
        (
            code: "Authentication.InvalidCredentials",
            description: "Invalid credentials"
        );

        public static Error InvalidRefreshToken => Error.Validation
        (
            code: "User.InvalidRefreshToken",
            description: "Invalid refresh token"
        );

        public static Error TokenExpired => Error.Validation
        (
            code: "User.TokenExpired",
            description: "Token expired"
        );
    }
}