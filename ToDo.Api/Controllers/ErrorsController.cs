
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ToDo.Application.Common.Errors;

namespace ToDo.Api.Controllers
{
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        [Route("/error")]
        public IActionResult Error()
        {
            Exception? exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;

            // If the exception is a custom exception, return the error code and message
            var (statusCode,message) = exception switch {
                IServiceException serviceException => ((int)serviceException.StatusCode, serviceException.ErrorMessage),
                _ => (StatusCodes.Status500InternalServerError,"An unexpected error occurred"),
            };
            return Problem(
                statusCode:statusCode,
                title:message
            );
        }
    }
}