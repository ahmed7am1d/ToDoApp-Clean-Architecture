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
    public class GetTaskTypesQueryHandler : IRequestHandler<GetTaskTypesQuery, List<TaskType>>
    {
        private readonly ITaskRepository _taskRepositroy;

        public GetTaskTypesQueryHandler(ITaskRepository taskRepositroy)
        {
            _taskRepositroy = taskRepositroy;
        }

        public async Task<List<TaskType>> Handle(GetTaskTypesQuery request, CancellationToken cancellationToken)
        {
            return  await _taskRepositroy.GetTaskTypesAsync();
        }
    }
}
