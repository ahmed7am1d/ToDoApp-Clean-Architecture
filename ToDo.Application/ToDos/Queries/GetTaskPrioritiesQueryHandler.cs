using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Entities.Tasks;

namespace ToDo.Application.ToDos.Queries
{
    internal class GetTaskPrioritiesQueryHandler : IRequestHandler<GetTaskPrioritiesQuery, List<TaskPriority>>
    {
        private readonly ITaskRepository _taskRepository;

        public GetTaskPrioritiesQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<List<TaskPriority>> Handle(GetTaskPrioritiesQuery request, CancellationToken cancellationToken)
            => await _taskRepository.GetTaskPrioritiesAsync();
    }
}
