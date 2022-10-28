using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ToDo.Application.Common.Services;

namespace ToDo.Infrastructure.Services
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserId()
        {
            var sid = _httpContextAccessor.HttpContext.User.Claims.Where(c => c.Type == JwtRegisteredClaimNames.Sub)
                   .Select(c => c.Value).SingleOrDefault();
            return sid;
        }
    }
}