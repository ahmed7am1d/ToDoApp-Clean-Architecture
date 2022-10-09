using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Enums.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskProgressMapper : IEntityTypeConfiguration<TaskProgress>
    {
        public void Configure(EntityTypeBuilder<TaskProgress> builder)
        {
            builder.Property(tp => tp.TaskProgressId).HasConversion<int>();
            //seeding table TaskProgress from the enum
            builder.HasData(
                Enum.GetValues(typeof(TaskProgressId))
                .Cast<TaskProgressId>()
                .Select(tp => new TaskProgress
                {
                    TaskProgressId = tp,
                    Name = tp.ToString()
                })
            );
        }
    }
}