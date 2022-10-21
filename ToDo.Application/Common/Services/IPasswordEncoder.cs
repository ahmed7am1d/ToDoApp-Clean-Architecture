using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Application.Common.Services
{
    public interface IPasswordEncoder
    {
        public string GetHashedPassword(string password);
    }
}
