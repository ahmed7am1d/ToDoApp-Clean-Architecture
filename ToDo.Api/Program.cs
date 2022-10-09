using ToDo.Api;
using ToDo.Application;
using ToDo.Infrastructure;
var builder = WebApplication.CreateBuilder(args);
{
    //Each Layer has its own dependencies injection registration
    builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration)
    .AddPresentation(builder);
}

var app = builder.Build();
{
    app.UseCors("MyPolicy");
    app.UseExceptionHandler("/error");
    //app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}