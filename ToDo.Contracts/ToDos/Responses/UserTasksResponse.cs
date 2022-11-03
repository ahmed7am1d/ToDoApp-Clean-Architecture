using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Contracts.ToDos.Responses
{
    public class UserTasksResponse
    {
        List<UserTaskResponse> Tasks { get; set; }
    }
}