using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using ToDo.Api.Errors;
using ToDo.Api.Filters;
using ToDo.Application;
using ToDo.Infrastructure;
var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddApplication();
    builder.Services.AddInfrastructure(builder.Configuration);
    //builder.Services.AddControllers( options => options.Filters.Add(new ErrorHandlingFilterAttribute()));
    builder.Services.AddControllers();
    //builder.Services.AddSingleton<ProblemDetailsFactory, ToDoProblemDetailsFactory>();
}

var app = builder.Build();
{
    //[1] Middleware first approach of error handling
    //app.UseMiddleware<ErrorHandlingMiddleware>();
    app.Map("/error",(HttpContext httpContext)=>{
        //pulling the exception from the HttpContext
        Exception? exception = httpContext.Features.Get<IExceptionHandlerFeature>()?.Error;
        return Results.Problem(
            detail: exception?.Message,
            statusCode:httpContext.Response.StatusCode,
            title: "An error occurred while processing your request."
        );
    });
    app.UseExceptionHandler("/error");
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}