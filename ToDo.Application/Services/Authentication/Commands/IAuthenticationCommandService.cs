using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;
using ToDo.Application.Services.Authentication.Common;

namespace ToDo.Application.Services.Authentication.Commands;

public interface IAuthenticationCommandService
{
    ErrorOr<AuthenticationResult> Register(string firstName, string lastName, string email, string password, string phoneNumber);
}