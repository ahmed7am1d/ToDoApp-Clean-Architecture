using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ToDo.Domain.Entities.Tasks;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;

namespace ToDo.Application.Common.Interfaces.Persistence
{
    public interface ITaskRepository
    {
        Task<List<ClientTask>> GetUserToDosTasksAsync(string userId);
        Task<List<ClientTask>> GetUserTasksInProgressAsync(string userId);
        Task<List<ClientTask>> GetUserDoneTasksAsync(string userId);
        Task<ClientTask> GetTaskAsync(Guid taskId);
        Task<List<ClientTask>> GetAllUserTasksAsync(Guid userId);
        Task<ClientTask> AddTaskAsync(ClientTask task, string userId);
        Task<ClientTask> UpdateTaskAsync(ClientTask task, string userId);
        Task<bool> DeleteTaskAsync(string taskId);
        Task<List<TaskPriority>> GetTaskPrioritiesAsync();
        Task<List<TaskProgress>> GetTaskProgressesAsync();
    }
}
