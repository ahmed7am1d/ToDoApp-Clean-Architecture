using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Contracts.User.Requests
{
    public class UpdateUserInfoRequest
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string ProfilePictureBytes { get; set; }
    }
}
