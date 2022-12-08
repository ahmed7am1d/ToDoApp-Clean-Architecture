using MapsterMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Application.Users.Common;
using ToDo.Domain.Entities;

namespace ToDo.Application.Users.Commands
{
    public class UpdatePersonalInfoCommandHandler : IRequestHandler<UpdatePersonalInfoCommand, UpdatePersonalInfoResult>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UpdatePersonalInfoCommandHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UpdatePersonalInfoResult> Handle(UpdatePersonalInfoCommand request, CancellationToken cancellationToken)
        {
            var userToUpdate = _mapper.Map<User>(request);
            var userUpdatedEntity = _userRepository.UpdateUserPersonalInfo(userToUpdate);
            var userUpdatedResult = _mapper.Map<UpdatePersonalInfoResult>(userUpdatedEntity);
            return  userUpdatedResult;
        }
    }
}
