using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Application.Users.Commands
{
    public class UpdatePersonalPasswordCommandValidator : AbstractValidator<UpdatePersonalPasswordCommand>
    {
        public UpdatePersonalPasswordCommandValidator()
        {
            RuleFor(c => c.Password).NotEmpty();
            RuleFor(c => c.Id).NotEmpty();
            RuleFor(c => c.NewPassword).NotEmpty();
        }
    }
}
