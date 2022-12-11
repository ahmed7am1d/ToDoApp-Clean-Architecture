using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Contracts.User.Requests
{
    public class UpdateUserPasswordRequest
    {
        public Guid Id { get; set; }
        public string Password { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}
