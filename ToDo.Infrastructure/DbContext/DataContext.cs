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
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TaskTypeMapper).Assembly);
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
                new TaskProgress{TaskProgressId = 2,Progress = "In Progress"},
                new TaskProgress{TaskProgressId = 3,Progress = "Overdue"}
            });

            modelBuilder.Entity<TaskType>().HasData(new List<TaskType>
            {
                new TaskType{TaskTypeId = 1,Type = "Daily"},
                new TaskType{TaskTypeId = 2,Type = "Weekly"},
                new TaskType{TaskTypeId = 3,Type = "Monthly"}
            });

        }
        //DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }
}