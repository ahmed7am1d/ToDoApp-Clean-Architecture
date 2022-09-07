using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ToDo.Application.Common.Interfaces.Authentication;
using ToDo.Application.Common.Services;
using ToDo.Domain.Entities;

namespace ToDo.Infrastructure.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IDateTimeProvider _dateTimeProvider;
        public JwtTokenGenerator(IDateTimeProvider dateTimeProvider,IOptions<JwtSettings> jwtOptions)
        {
            _dateTimeProvider = dateTimeProvider;
            _jwtSettings = jwtOptions.Value;
        }

        public string GenerateToken(User user)
        {
            //Security key
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
                SecurityAlgorithms.HmacSha256);
            //Claims
            var claims = new List<Claim>
            {
               new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
               new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
               new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
               new Claim("PhoneNumber", user.PhoneNumber),
               new Claim("JwtRegisteredClaimNames.Jti", Guid.NewGuid().ToString()),
            };
            //Token
            var securityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                expires: _dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpiryTime),
                claims:claims,
                signingCredentials:signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}