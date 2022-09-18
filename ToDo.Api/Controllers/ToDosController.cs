using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ToDo.Api.Controllers;
[Route("[controller]")]


public class ToDosController : ApiController
{
    [HttpGet]
    public IActionResult ListToDos()
    {
        return Ok(new List<string>());
    }
}