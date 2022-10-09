using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Enums.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskPriortyMapper : IEntityTypeConfiguration<TaskPriority>
    {
        public void Configure(EntityTypeBuilder<TaskPriority> builder)
        {
            builder.Property(tp => tp.TaskPriorityId).HasConversion<int>();
            //seeding table TaskPriority from the enum
            builder.HasData(
                Enum.GetValues(typeof(TaskPriorityId))
                .Cast<TaskPriorityId>().Select(
                    tp => new TaskPriority
                    {
                        TaskPriorityId = tp,
                        Name = tp.ToString()
                    }
                )
            );
        }
    }
}