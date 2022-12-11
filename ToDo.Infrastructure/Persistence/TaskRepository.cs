using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;
using ToDo.Application.Common.Interfaces.Persistence;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Entities.Tasks;
using MapsterMapper;

namespace ToDo.Infrastructure.Persistence
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        public TaskRepository(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<ClientTask> AddTaskAsync(ClientTask task, string userId)
        {
            task.UserId = Guid.Parse(userId);
            _dataContext.Tasks.Add(task);
            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            var taskDB = await _dataContext.Tasks.Include(t => t.Priority)
                        .Include(t => t.Progress)
                        .Include(t => t.Priority)
                        .FirstOrDefaultAsync(t => t.TaskId == task.TaskId);
            return taskDB;
        }

        public async Task<ClientTask> GetTaskAsync(Guid taskId) => await _dataContext.Tasks.FirstOrDefaultAsync(x => x.TaskId == taskId);

        public async Task<ClientTask> UpdateTaskAsync(ClientTask task, string userId)
        {

            var taskDB = await _dataContext.Tasks.
                Include(t => t.Priority)
                .Include(t => t.Progress)
                .FirstOrDefaultAsync(t => t.TaskId == task.TaskId);

            _mapper.Map(task, taskDB);

            _dataContext.Entry(taskDB).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return taskDB;
        }

        public async Task<List<TaskPriority>> GetTaskPrioritiesAsync() => await _dataContext.TaskPriorities.ToListAsync();

        public async Task<List<TaskProgress>> GetTaskProgressesAsync() => await _dataContext.TaskProgresses.ToListAsync();

        public async Task<ClientTask> AddTask(ClientTask taskToAdd)
        {
            await _dataContext.Tasks.AddAsync(taskToAdd);
            await _dataContext.SaveChangesAsync();
            return taskToAdd;
        }

        public async Task<List<ClientTask>> GetUserToDosTasksAsync(string userId) =>
        await _dataContext.Tasks
            .Where(t => t.UserId.ToString() == userId)
            .Where(t => t.TaskProgressId == 2)
            .Include(t => t.Priority)
            .Include(t => t.Progress)
          .ToListAsync();

        public async Task<List<ClientTask>> GetUserTasksInProgressAsync(string userId) =>
         await _dataContext.Tasks
        .Where(t => t.UserId.ToString() == userId)
        .Where(t => t.TaskProgressId == 3)
        .Include(t => t.Priority)
        .Include(t => t.Progress)
        .Include(t => t.Priority)
        .ToListAsync();

        public async Task<List<ClientTask>> GetUserDoneTasksAsync(string userId) =>
                    await _dataContext.Tasks
        .Where(t => t.UserId.ToString() == userId)
        .Where(t => t.TaskProgressId == 1)
        .Include(t => t.Priority)
        .Include(t => t.Progress)
        .Include(t => t.Priority)
       .ToListAsync();

        public async Task<bool> DeleteTaskAsync(string taskId)
        {
            var clientTask = new ClientTask { TaskId = Guid.Parse(taskId) };
            _dataContext.Tasks.Attach(clientTask);
            _dataContext.Tasks.Remove(clientTask);
            var deleteResult = await _dataContext.SaveChangesAsync();
            return deleteResult > 0;
        }
    }
}
