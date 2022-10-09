using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Enums.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskTypeMapper : IEntityTypeConfiguration<TaskType>
    {
        public void Configure(EntityTypeBuilder<TaskType> builder)
        {
            builder.Property(tt => tt.TaskTypeId).HasConversion<int>();
            //seeding table TaskType from the enum
            builder.HasData(Enum.GetValues(typeof(TaskTypeId))
            .Cast<TaskTypeId>()
            .Select(tt => new TaskType()
            {
                TaskTypeId = tt,
                Name = tt.ToString()
            })
            );
        }
    }
}