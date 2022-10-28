using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Contracts.Authentication.Responses
{
    public record RefreshTokenResponse
    (
        string RefreshToken
    );
}