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
using ToDo.Application.ToDos.Commands;
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

    [HttpGet("task-types")]
    public async Task<IActionResult> GetTaskTypes()
    {
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

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetToDos(string userId)
    {
        var toDos = await _mediator.Send(new GetUserToDosQuery(userId));

        if (toDos is null)
            return NoContent();

        return Ok(_mapper.Map<List<UserTaskResponse>>(toDos));
    }

    [HttpGet("in-progress-tasks/{userId}")]
    public async Task<IActionResult> GetUserTasksInProgress(string userId)
    {
        var inProgressUserTasks = await _mediator.Send(new GetUserTasksInProgressQuery(userId));
        if (inProgressUserTasks is null) return NoContent();

        return Ok(_mapper.Map<List<UserTaskResponse>>(inProgressUserTasks));
    }

    [HttpGet("todo-done-tasks/{userId}")]
    public async Task<IActionResult> GetUserDoneTasks(string userId)
    {
        var userDoneTasks = await _mediator.Send(new GetUserDoneTasksQuery(userId));
        if (userDoneTasks is null) return NoContent();
        return Ok(_mapper.Map<List<UserTaskResponse>>(userDoneTasks));
    }

    [HttpPost("addTask")]
    public async Task<IActionResult> AddUserTask([FromBody] AddTaskRequest addTaskRequest)
    {
        var command = _mapper.Map<AddTaskCommand>(addTaskRequest);
        var todoResult = await _mediator.Send(command);
        var todoResponse = _mapper.Map<UserTaskResponse>(todoResult);
        if (todoResponse is null) return StatusCode(400);
        return Ok(todoResponse);
    }

    [HttpPut("update-task")]
    public async Task<IActionResult> UpdateUserTask([FromBody] UpdateTaskReqeust updateTaskReqeust)
    {
        var command = _mapper.Map<UpdateTaskCommand>(updateTaskReqeust);
        var updateTaskResult = await _mediator.Send(command);
        var updatedTaskResponse = _mapper.Map<UserTaskResponse>(updateTaskResult);
        if (updatedTaskResponse is null) return BadRequest();
        return Ok(updatedTaskResponse);
    }

    [HttpDelete("delete-task/{taskId}")]
    public async Task<IActionResult> DeleteUserTask(string taskId)
    {
        var deleteResult = await _mediator.Send(new DeleteTaskCommand(taskId));
        if (!deleteResult) return NotFound();
        return NoContent();
    }

}