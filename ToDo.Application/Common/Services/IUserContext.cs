using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Application.Common.Services
{
    public interface IUserContext
    {
        public string GetUserId();
    }
}