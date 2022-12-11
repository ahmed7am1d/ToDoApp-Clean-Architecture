using MapsterMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Application.ToDos.Common;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;

namespace ToDo.Application.ToDos.Commands
{
    public class AddTaskCommandHandler : IRequestHandler<AddTaskCommand, AddTaskResult>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public AddTaskCommandHandler(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }
        public async Task<AddTaskResult> Handle(AddTaskCommand request, CancellationToken cancellationToken)
        {
            var taskToAdd = new ClientTask
            {
                TaskTitle = request.TaskTitle,
                TaskDescription = request.TaskDescription,
                TaskPriorityId = request.TaskPriorityId,
                DeadlineDate = request.DeadlineDate,
                TaskProgressId = 2,
            };

            var task = await _taskRepository.AddTaskAsync(taskToAdd,request.UserId);
            var taskResult = _mapper.Map<AddTaskResult>(task);

            return taskResult;
        }
    }
}
