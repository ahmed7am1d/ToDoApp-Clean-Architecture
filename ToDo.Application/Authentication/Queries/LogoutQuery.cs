using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Application.Authentication.Queries
{
    public record LogoutQuery
    (
        string refreshToken
    ) : IRequest<bool>;
}
