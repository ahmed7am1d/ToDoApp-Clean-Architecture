using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;

namespace ToDo.Application.ToDos.Queries
{
    public record GetAllUserTasksQuery (
        Guid UserId
        ) : IRequest<List<ClientTask>>;
    
}
