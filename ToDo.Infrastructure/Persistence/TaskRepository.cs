using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;
using ToDo.Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Entities.Tasks;

namespace ToDo.Infrastructure.Persistence
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _dataContext;

        public TaskRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ClientTask> AddTaskAsync(ClientTask task)
        {
            _dataContext.Tasks.Add(task);
            await _dataContext.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteTaskAsync(ClientTask task)
        {
            _dataContext.Tasks.Remove(task);
            var isDeleted = await _dataContext.SaveChangesAsync();
            return isDeleted > 0;
        }

        public async Task<List<ClientTask>> GetAllTasksAsync(string userId) =>
        await _dataContext.Tasks
        .Where(t => t.UserId.ToString() == userId)
        .Include(t => t.Priority)
        .Include(t=> t.Progress)
        .Include(t=> t.Priority)
        .Include(t=> t.Type).ToListAsync();

        public async Task<ClientTask> GetTaskAsync(Guid taskId) => await _dataContext.Tasks.FirstOrDefaultAsync(x => x.TaskId == taskId);

        public async Task<ClientTask> UpdateTaskAsync(ClientTask task)
        {
            _dataContext.Entry(task).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return task;
        }
    
        public async Task<List<TaskPriority>> GetTaskPrioritiesAsync() => await _dataContext.TaskPriorities.ToListAsync();

        public async Task<List<TaskProgress>> GetTaskProgressesAsync() => await _dataContext.TaskProgresses.ToListAsync();

        public async Task<List<TaskType>> GetTaskTypesAsync() => await _dataContext.TaskTypes.ToListAsync();
    }
}
