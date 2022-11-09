using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Application.ToDos.Queries;
using ToDo.Contracts.ToDos.Requests;
using ToDo.Contracts.ToDos.Responses;

namespace ToDo.Api.Controllers;

[Route("todo")]
[Authorize]
public class ToDosController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ToDosController(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }
    //[FromBody] UserTasksRequest userTasksRequest

    [Authorize]
    [HttpPost("{userId}")]
    public async Task<IActionResult> GetToDos(string userId)
    {
        //string accessTokenExpire =  HttpContext.User.Claims.FirstOrDefault(c => c.Type == "exp").Value;
        var toDos = await _mediator.Send(new GetAllToDosQuery(userId));

        if (toDos is null) 
            return NoContent();

        return Ok(_mapper.Map<List<UserTaskResponse>>(toDos));
    }

    [HttpGet("task-types")]
    public async Task<IActionResult> GetTaskTypes() {
        var taskTypes = await _mediator.Send(new GetTaskTypesQuery());
        if (taskTypes is null) return NoContent();
        return Ok(taskTypes);
    }

    [HttpGet("task-progresses")]
    public async Task<IActionResult> GetTaskProgresses()
    {
        var taskProgresses = await _mediator.Send(new GetTaskProgressesQuery());
        if (taskProgresses is null) return NoContent();
        return Ok(taskProgresses);
    }

    [HttpGet("task-priorities")]
    public async Task<IActionResult> GetTaskPriorities()
    {
        var taskPriorities = await _mediator.Send(new GetTaskPrioritiesQuery());
        if (taskPriorities is null) return NoContent();
        return Ok(taskPriorities);
    }
}