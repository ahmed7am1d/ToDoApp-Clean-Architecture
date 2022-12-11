using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Users.Commands;
using ToDo.Contracts.User.Requests;
using ToDo.Contracts.User.Responses;

namespace ToDo.Api.Controllers
{
    [Route("user")]
    [Authorize]
    public class UserController : ApiController
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        
        public UserController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }
        [HttpPut("update-personal-info")]
        public async Task<IActionResult> UpdateUserInfo([FromBody] UpdateUserInfoRequest updateUserInfoRequest)
        {
            var userUpdateCommand = _mapper.Map<UpdatePersonalInfoCommand>(updateUserInfoRequest);
            var userUpdatedResult = await _mediator.Send(userUpdateCommand);
            var userUpdatedResponse = _mapper.Map<UpdateUserInfoResponse>(userUpdatedResult);
            if (userUpdatedResponse is null) return BadRequest();

            return Ok(userUpdatedResponse);
        }

        [HttpPut("update-personal-password")]
        public async Task<IActionResult> UpdateUserPassword([FromBody] UpdateUserPasswordRequest updateUserPasswordRequest)
        {
            var command = _mapper.Map<UpdatePersonalPasswordCommand>(updateUserPasswordRequest);
            var updatePasswordResult = await _mediator.Send(command);
            if(!updatePasswordResult.IsError)
            {
                return Ok();
            }
            return Problem(updatePasswordResult.Errors);
        }
    }
}
