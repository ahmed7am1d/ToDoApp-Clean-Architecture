using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;

namespace ToDo.Application.Common.Interfaces.Persistence
{
    public interface ITaskRepository
    {
        Task<List<ClientTask>> GetAllTasksAsync();
        Task<ClientTask> GetTaskAsync(Guid taskId);
        Task<ClientTask> AddTaskAsync(ClientTask task);
        Task<ClientTask> UpdateTaskAsync(ClientTask task);
        Task<bool> DeleteTaskAsync(ClientTask task);
    }
}
