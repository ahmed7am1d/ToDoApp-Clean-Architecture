using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskTypeMapper : IEntityTypeConfiguration<TaskType>
    {
        public void Configure(EntityTypeBuilder<TaskType> builder)
        {
            builder.ToTable("TaskType");
            builder.HasKey(tp => tp.TaskTypeId);
        }
    }
}
