using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskPriorityMapper : IEntityTypeConfiguration<TaskPriority>
    {
        public void Configure(EntityTypeBuilder<TaskPriority> builder)
        {
            builder.ToTable("TaskPriority");
            builder.HasKey(tp => tp.TaskPriorityId);
        }
    }
}
