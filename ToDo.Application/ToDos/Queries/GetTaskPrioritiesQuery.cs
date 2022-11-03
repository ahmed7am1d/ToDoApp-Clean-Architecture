using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Domain.Entities.Tasks;

namespace ToDo.Application.ToDos.Queries
{
    public record GetTaskPrioritiesQuery : IRequest<List<TaskPriority>>;
}
