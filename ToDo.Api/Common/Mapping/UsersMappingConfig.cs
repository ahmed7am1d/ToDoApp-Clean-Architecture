using Mapster;
using ToDo.Application.Users.Commands;
using ToDo.Domain.Entities;

namespace ToDo.Api.Common.Mapping
{
    public class UsersMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, User>().IgnoreNullValues(true).AfterMapping((src, dest) =>
            {
                if (src.PhoneNumber is null)
                    dest.PhoneNumber = null;

                if (src.ProfilePictureBytes is null)
                    dest.ProfilePictureBytes = null;

                if (src.LastName is null)
                    dest.LastName = null;
            });
            config.NewConfig<UpdatePersonalInfoCommand, User>().
                Map(dest => dest.ProfilePictureBytes, src => Convert.FromBase64String(src.ProfilePictureBytes));
        }
    }
}
