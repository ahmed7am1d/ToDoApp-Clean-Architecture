using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;
using MediatR;
using ToDo.Application.Authentication.Common;

namespace ToDo.Application.Authentication.Commands.Register;

//it should match the register request
//the return will be either AuthenticationResult or a list of errors
//it is necessary to implement IRequest because we are using MediatR
public record RegisterCommand
(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string PhoneNumber) : IRequest<ErrorOr<AuthenticationResult>>;
