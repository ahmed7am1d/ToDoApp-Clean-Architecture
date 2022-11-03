using Mapster;
using ToDo.Contracts.ToDos.Responses;
using ClientTask = ToDo.Domain.Entities.Tasks.Task;
namespace ToDo.Api.Common.Mapping
{
    public class ToDosMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            //config.NewConfig<source, destinitaion>
            config.NewConfig<ClientTask, UserTaskResponse>()
                .Map(dest => dest.Progress, src => src.Progress.Progress)
                .Map(dest => dest.Type, src => src.Type.Type)
                .Map(dest => dest.Priority, src => src.Priority.Priority);
        }
    }
}
