using Mapster;
using ToDo.Application.Users.Commands;
using ToDo.Application.Users.Common;
using ToDo.Domain.Entities;

namespace ToDo.Api.Common.Mapping
{
    public class UsersMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, User>()
                .Ignore(dest => dest.RefreshToken)
                .Ignore(dest => dest.TokenCreated)
                .Ignore(dest => dest.TokenExpires)
                .BeforeMapping((dest, src) =>
            {
                if (String.IsNullOrEmpty(src.PhoneNumber))
                    dest.PhoneNumber = null;

                if (src.ProfilePictureBytes is null || src.ProfilePictureBytes.Length ==0)
                    dest.ProfilePictureBytes = null;

                if (String.IsNullOrEmpty(src.LastName))
                    dest.LastName = null;
                if (String.IsNullOrEmpty(src.Email))
                    dest.Email = dest.Email;
                if (String.IsNullOrEmpty(src.Password))
                    dest.Password = dest.Password;
            });

            config.NewConfig<UpdatePersonalInfoCommand, User>().
                Map(dest => dest.ProfilePictureBytes, src => Convert.FromBase64String(src.ProfilePictureBytes));

            config.NewConfig<User, UpdatePersonalInfoResult>().Map(dest => dest.ProfilePictureBytes, src => Convert.ToBase64String(src.ProfilePictureBytes));
        }
    }
}
