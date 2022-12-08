using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Application.Users.Common
{
    public record UpdatePersonalInfoResult
    (
        string FirstName,
        string LastName,
        string PhoneNumber,
        string ProfilePictureBytes
    );
}
