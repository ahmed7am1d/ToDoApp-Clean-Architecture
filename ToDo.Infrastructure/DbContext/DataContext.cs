using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Entities;
using ToDo.Domain.Entities.Tasks;
using Task = ToDo.Domain.Entities.Tasks.Task;

namespace ToDo.Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //EF Core Mapping Configuration
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserMapper).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TaskMapper).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TaskPriorityMapper).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TaskProgressMapper).Assembly);
            //Data Seeding
            modelBuilder.Entity<TaskPriority>().HasData(new List<TaskPriority>
            {
                new TaskPriority{TaskPriorityId = 1,Priority = "High"},
                new TaskPriority{TaskPriorityId = 2,Priority = "Medium"},
                new TaskPriority{TaskPriorityId = 3,Priority = "Low"}
            });

            modelBuilder.Entity<TaskProgress>().HasData(new List<TaskProgress>
            {
                new TaskProgress{TaskProgressId = 1,Progress = "Done"},
                new TaskProgress{TaskProgressId = 2,Progress = "ToDo"},
                new TaskProgress{TaskProgressId = 3,Progress = "In Progress"}
            });


        }
        //DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskProgress> TaskProgresses { get; set; }
        public DbSet<TaskPriority> TaskPriorities { get; set; }
    }
}