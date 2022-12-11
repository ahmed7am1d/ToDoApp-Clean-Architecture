using ErrorOr;
using MediatR;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Application.Common.Services;
using ToDo.Domain.Common.Errors;

namespace ToDo.Application.Users.Commands
{
    public class UpdatePersonalPasswordCommandHandler : IRequestHandler<UpdatePersonalPasswordCommand, ErrorOr<bool>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordEncoder _passwordEncoder;

        public UpdatePersonalPasswordCommandHandler(IUserRepository userRepository, IPasswordEncoder passwordEncoder)
        {
            _userRepository = userRepository;
            _passwordEncoder = passwordEncoder;
        }

        public async Task<ErrorOr<bool>> Handle(UpdatePersonalPasswordCommand request, CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
            //[1] - Validate that password belongs to the user with the Id 
            //if user provided right password
            if (_userRepository.ValidateUserPassword(request.Id, _passwordEncoder.GetHashedPassword(request.Password)))
            {
                //Update his password 
                var newHashedPassword = _passwordEncoder.GetHashedPassword(request.NewPassword);
                var isPasswordUpdated = _userRepository.UpdateUserPassword(request.Id, newHashedPassword);
                if (isPasswordUpdated) return true;
            }
            return new[] { Errors.Authentication.InvalidCredentials };
        }
    }
}
