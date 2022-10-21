using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.ToDos.Queries;

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

    [HttpGet("ToDos")]
    public async Task<IActionResult> GetToDos()
    {
        return Ok(await _mediator.Send(new GetAllToDosQuery()));
    }
}