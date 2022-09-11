using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Entities;

namespace ToDo.Application.Services.Authentication.Common
{
    public record AuthenticationResult
(
        User User,
        string Token
    );
}