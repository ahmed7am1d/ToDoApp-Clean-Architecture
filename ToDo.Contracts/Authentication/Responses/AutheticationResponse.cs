using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Contracts.Authentication.Responses;
    public record AutheticationResponse
    (
        Guid Id,
        string FirstName,
        string LastName,
        string Email,
        string PhoneNumber,
        string Token
    );
