using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Entities.Tasks;

namespace ToDo.Application.ToDos.Common
{
    public record AddTaskResult
    (
     string TaskId,
     string TaskTitle,
     string TaskDescription,
     DateTime DateCreated,
     DateTime DeadlineDate,
     Guid UserId,
     User User,
     int TaskPriorityId,
     TaskPriority Priority,
     int TaskProgressId,
     TaskProgress Progress,
     int TaskTypeId,
     TaskType Type);
}
