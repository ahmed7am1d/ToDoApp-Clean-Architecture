using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;
namespace ToDo.Application.ToDos.Commands
{
    public record UpdateTaskCommand
    (
        Guid TaskId,
        Guid UserId,
        string TaskTitle,
        string TaskDescription,
        DateTime DeadlineDate,
        int TaskPriorityId,
        int TaskProgressId
        ) : IRequest<ClientTask>;
}
