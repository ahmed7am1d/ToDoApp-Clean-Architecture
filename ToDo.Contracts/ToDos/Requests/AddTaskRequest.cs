using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Contracts.ToDos.Requests
{
    public class AddTaskRequest
    {
        public string UserId { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime DeadlineDate { get; set; }
        public int TaskPriorityId { get; set; }
    }
}
