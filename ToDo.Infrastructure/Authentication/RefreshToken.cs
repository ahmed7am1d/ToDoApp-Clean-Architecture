using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Infrastructure.Authentication
{
    public class RefreshToken
    {
        public string Token { get; set; } = string.Empty;
        public DateTime DateCreated {get;set;} = DateTime.Now;
        public DateTime Expires {get;set;}
    }
}