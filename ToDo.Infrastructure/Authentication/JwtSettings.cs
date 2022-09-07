using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Infrastructure.Authentication
{
    public class JwtSettings
    {
        public const string SectionName = "JwtSettings";
        public string Secret { get; init; } = null!;
        public int ExpiryTime { get; init; }
        public string Issuer { get; init; } = null!;
        public string Audience { get; set; } = null!;

    }
}