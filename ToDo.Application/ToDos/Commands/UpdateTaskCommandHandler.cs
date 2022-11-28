using MapsterMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Interfaces.Persistence;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;

namespace ToDo.Application.ToDos.Commands
{
    public class UpdateTaskCommandHandler : IRequestHandler<UpdateTaskCommand, ClientTask>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public UpdateTaskCommandHandler(ITaskRepository taskRepository, IMapper mapper = null)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }
        public async Task<ClientTask> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = _mapper.Map<ClientTask>(request);
            task.TaskTypeId = 1;
            var updatedTask = await _taskRepository.UpdateTaskAsync(task, request.UserId.ToString());
            return updatedTask;
        }
    }
}
