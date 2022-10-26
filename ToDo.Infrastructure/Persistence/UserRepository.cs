using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Entities;

namespace ToDo.Infrastructure.Persistence
{
    //Remember that infrastructure we don't do any validation it is all done in the application layer
    //that's why we have application layer and infrastructure layer
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add(User user)
        {
            _dataContext.Users.Add(user);
            _dataContext.SaveChanges();
        }

        public User? GetUserByEmail(string email)
        {
            return _dataContext.Users.FirstOrDefault(user => user.Email == email);
        }
        public bool SetUserRefereshToken(string refreshToken, User user, DateTime DateCreated, DateTime RefreshTokenExipryTime)
        {
            user.RefreshToken = refreshToken;
            user.TokenExpires = RefreshTokenExipryTime;
            user.TokenCreated = DateCreated;
            _dataContext.Entry(user).State = EntityState.Modified;
            return _dataContext.SaveChanges() > 0;
        }
    }
}