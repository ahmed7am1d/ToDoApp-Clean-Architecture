using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Entities;
using ToDo.Domain.Entities.Tasks;

namespace ToDo.Infrastructure.Persistence
{
    //Remember that infrastructure we don't do any validation it is all done in the application layer
    //that's why we have application layer and infrastructure layer
    public class UserRepository : IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
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

        public User? GetUserById(string userId)
        {
            return _dataContext.Users.FirstOrDefault(user => user.Id.ToString().Equals(userId));
        }

        public User? GetUserByRefreshToken(string refreshToken)
        {
            return _dataContext.Users.FirstOrDefault(user => user.RefreshToken.Equals(refreshToken));
        }

        public bool SetUserRefereshToken(string refreshToken, User user, DateTime DateCreated, DateTime RefreshTokenExipryTime)
        {
            user.RefreshToken = refreshToken;
            user.TokenExpires = RefreshTokenExipryTime;
            user.TokenCreated = DateCreated;
            _dataContext.Entry(user).State = EntityState.Modified;
            return _dataContext.SaveChanges() > 0;
        }

        public User? UpdateUserPersonalInfo(User user)
        {
            var userDB = _dataContext.Users.FirstOrDefault(t => t.Id == user.Id);
            _mapper.Map(user, userDB);
            _dataContext.Entry(userDB).State = EntityState.Modified;
            _dataContext.SaveChanges();
            return userDB;
        }
    }
}