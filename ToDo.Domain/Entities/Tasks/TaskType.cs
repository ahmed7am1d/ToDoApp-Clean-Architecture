using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Enums.Tasks;

namespace ToDo.Domain.Entities.Tasks
{
    public class TaskType
    {
        public TaskTypeId TaskTypeId {get;set;}
        public string Name {get;set;}
        public List<Task> Tasks {get;set;}
    }
}