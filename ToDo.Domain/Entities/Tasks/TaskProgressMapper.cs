using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskProgressMapper : IEntityTypeConfiguration<TaskProgress>
    {
        public void Configure(EntityTypeBuilder<TaskProgress> builder)
        {
            builder.ToTable("TaskProgress");
            builder.HasKey(tp => tp.TaskProgressId);
        }
    }
}