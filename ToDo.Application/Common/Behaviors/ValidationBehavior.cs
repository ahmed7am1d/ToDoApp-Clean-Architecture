using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorOr;
using FluentValidation;
using MediatR;
using ToDo.Application.Authentication.Commands.Register;
using ToDo.Application.Authentication.Common;

namespace ToDo.Application.Common.Behaviors;

//managing commands and queries before they are sent to the handler
public class ValidateRegisterCommandBehavior : IPipelineBehavior<RegisterCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IValidator<RegisterCommand> _validator;

    public ValidateRegisterCommandBehavior(IValidator<RegisterCommand> validator)
    {
        _validator = validator;
    }

    /// <summary>
    /// > This function is called when a user registers. It will create a new user in the database, and
    /// then return a JWT token
    /// </summary>
    /// <param name="RegisterCommand">The command that is being handled.</param>
    /// <param name="CancellationToken">This is a token that can be used to cancel the request.</param>
    /// <param name="next">The next handler in the pipeline.</param>

    public async Task<ErrorOr<AuthenticationResult>> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken,
        RequestHandlerDelegate<ErrorOr<AuthenticationResult>> next)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if(validationResult.IsValid) {
            //if the validation is successful, we will call the our handler 
            return await next();
        }
        //if the validation is not successful, we will return list of ErrorOrs
        var errors = validationResult.Errors
        .ConvertAll(validationFailure => Error.Validation(
            validationFailure.PropertyName,
            validationFailure.ErrorMessage));

        return errors;
    }
}