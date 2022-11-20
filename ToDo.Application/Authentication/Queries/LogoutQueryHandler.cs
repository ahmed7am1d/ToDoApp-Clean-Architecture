using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Interfaces.Persistence;

namespace ToDo.Application.Authentication.Queries
{
    public class LogoutQueryHandler : IRequestHandler<LogoutQuery, bool>
    {

        private readonly IUserRepository _userRepository;
        public LogoutQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<bool> Handle(LogoutQuery request, CancellationToken cancellationToken)
        {
            var user = _userRepository.GetUserByRefreshToken(request.refreshToken);
            if (user is null)
                return false;

            return true;
        }
    }
}
