using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Authentication.Common;
using ToDo.Application.Users.Common;

namespace ToDo.Application.Users.Commands
{
    public record UpdatePersonalInfoCommand
    (
        Guid Id,
        string FirstName, 
        string LastName,
        string PhoneNumber,
        string ProfilePictureBytes): IRequest<UpdatePersonalInfoResult>;
}
