using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.ToDos.Common;

namespace ToDo.Application.ToDos.Commands
{
    public record AddTaskCommand
    (
        string UserId,
        string TaskTitle,
        string TaskDescription,
        DateTime DeadlineDate,
        int TaskPriorityId
        ) : IRequest<AddTaskResult>;
}
