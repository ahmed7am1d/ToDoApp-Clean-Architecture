using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Contracts.Authentication.Requests
{
    public record RefreshTokenRequest
    (
        string RefreshToken
    );
}