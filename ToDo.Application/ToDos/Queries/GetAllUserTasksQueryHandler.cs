using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Interfaces.Persistence;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;
namespace ToDo.Application.ToDos.Queries
{
    public class GetAllUserTasksQueryHandler : IRequestHandler<GetAllUserTasksQuery, List<ClientTask>>
    {
        private readonly ITaskRepository _taskRepository;

        public GetAllUserTasksQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<List<ClientTask>> Handle(GetAllUserTasksQuery request, CancellationToken cancellationToken)
        {
            return await _taskRepository.GetAllUserTasksAsync(request.UserId);
        }
    }
}
