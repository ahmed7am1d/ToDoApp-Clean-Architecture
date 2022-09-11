using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;
using ToDo.Application.Services.Authentication.Common;

namespace ToDo.Application.Services.Authentication.Queries;

public interface IAuthenticationQueryService
{
    ErrorOr<AuthenticationResult> Login(string email, string password);
}