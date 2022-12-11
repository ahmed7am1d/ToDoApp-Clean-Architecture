using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Entities;

namespace ToDo.Application.Common.Interfaces.Persistence
{
    public interface IUserRepository
    {
        User? GetUserByEmail(string email);
        User? GetUserById(string userId);
        void Add(User user);
        bool SetUserRefereshToken(string refreshToken, User user, DateTime DateCreated, DateTime RefreshTokenExipryTime);
        User? GetUserByRefreshToken(string refreshToken);
        User? UpdateUserPersonalInfo(User user);
        bool ValidateUserPassword (Guid id, string hashedPassword);
        bool UpdateUserPassword(Guid id, string newHashedPassword);

    }
}