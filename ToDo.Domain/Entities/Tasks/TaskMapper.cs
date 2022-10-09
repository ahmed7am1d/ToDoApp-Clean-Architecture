using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskMapper : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.ToTable("Tasks");
            builder.HasKey(t => t.TaskId);
            builder.Property(t => t.TaskId).ValueGeneratedOnAdd();
            builder.Property(t => t.TaskTitle).IsRequired().HasMaxLength(50);
            builder.Property(t => t.TaskDescription).HasMaxLength(512);
            builder.Property(t => t.DateCreated)
                   .HasColumnType("DATETIME")
                   .HasDefaultValueSql("GETDATE()");
            builder.HasOne(t => t.User).WithMany().HasForeignKey(t => t.UserId);
            builder.HasOne(t => t.Type).WithMany().HasForeignKey(t => t.TaskTypeId);
            builder.HasOne(t => t.Progress).WithMany().HasForeignKey(t => t.TaskProgressId);
            builder.HasOne(t => t.Priority).WithMany().HasForeignKey(t => t.TaskPriorityId);
        }
    }
}