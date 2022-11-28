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
    public class GetTaskProgressesQueryHandler : IRequestHandler<GetTaskProgressesQuery, List<TaskProgress>>
    {
        private readonly ITaskRepository _taskRepository;

        public GetTaskProgressesQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<List<TaskProgress>> Handle(GetTaskProgressesQuery request, CancellationToken cancellationToken) => await _taskRepository.GetTaskProgressesAsync();

    }
}
