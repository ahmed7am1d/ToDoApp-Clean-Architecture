using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Application.Services.Authentication
{
    public interface IAuthenticationService
    {
        AuthenticationResult Login(string email, string password);
        AuthenticationResult Register(string firtsName, string lastName, string email, string password, string phoneNumber);
    }
}