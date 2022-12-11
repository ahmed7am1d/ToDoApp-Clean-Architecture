using ErrorOr;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Application.Users.Commands
{
    public record UpdatePersonalPasswordCommand
        (
        Guid Id,
        string Password,
        string NewPassword
        ) : IRequest<ErrorOr<bool>>;
}
