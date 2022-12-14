namespace ToDo.Domain.Entities.Tasks
{
    public class Task
    {
        public Guid TaskId { get; set; }
        public string TaskTitle { get; set; }
        public string? TaskDescription { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime? DeadlineDate { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public int TaskPriorityId { get; set; }
        public TaskPriority Priority { get; set; }
        public int TaskProgressId { get; set; }
        public TaskProgress Progress { get; set; }

    }
}