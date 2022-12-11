using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Contracts.ToDos.Responses
{
    public class UserTaskResponse
    {
        public Guid TaskId { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DeadlineDate { get; set; }
        public int TaskPriorityId { get; set; }
        public string Priority { get; set; }
        public int TaskProgressId { get; set; }
        public string Progress { get; set; }
  
    }
}