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
//it will recive RegisterCommand and will return ErroOr or Authentication result
public class ValidationBehavior<TRequest,TResponse>
 : IPipelineBehavior<TRequest, TResponse>
 where TRequest: IRequest<TResponse>
 where TResponse : IErrorOr
{
    private readonly IValidator<TRequest>? _validator;

    public ValidationBehavior(IValidator<TRequest>? validator = null)
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

    public async Task<TResponse> Handle(
        TRequest request,
        CancellationToken cancellationToken,
        RequestHandlerDelegate<TResponse> next)
    {
        if (_validator is null) {
            return await next();
        }
        
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if(validationResult.IsValid) {
            //if the validation is successful, we will call our handler and return the result
            return await next();
        }
        //if the validation is not successful, we will return list of ErrorOrs
        //we are reciving a list of errors from the validator and we are converting it to a list of ErrorOrs
        // every time we return list and then to async we can use instead ConvertAll method
        //var errors = validationResult.Errors.Select(error =>  Error.Validation(error.ErrorMessage, error.ErrorMessage)).ToList();
        var errors = validationResult.Errors
        .ConvertAll(validationFailure => Error.Validation(
            validationFailure.PropertyName,
            validationFailure.ErrorMessage));

        return (dynamic)errors;
    }
}