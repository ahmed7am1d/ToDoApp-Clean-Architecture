using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

        public bool UpdateUserPassword(Guid id, string newHashedPassword)
        {
            var user = _dataContext.Users.FirstOrDefault(x => x.Id == id);
            user.Password = newHashedPassword;
            _dataContext.Entry(user).State = EntityState.Modified;
            return _dataContext.SaveChanges() > 0;
        }

        public User? UpdateUserPersonalInfo(User user)
        {
            var userDB = _dataContext.Users.FirstOrDefault(t => t.Id == user.Id);

            if (String.IsNullOrEmpty(user.LastName))
                userDB.LastName = null;
            else
                userDB.LastName = user.LastName;

            if (String.IsNullOrEmpty(user.PhoneNumber))
                userDB.PhoneNumber = null;
            else
                userDB.PhoneNumber = user.PhoneNumber;

            if (user.ProfilePictureBytes is null || user.ProfilePictureBytes.Length == 0)
                userDB.ProfilePictureBytes = null;
            else
                userDB.ProfilePictureBytes = user.ProfilePictureBytes;

            userDB.FirstName = user.FirstName;
            _dataContext.Entry(userDB).State = EntityState.Modified;
            _dataContext.SaveChanges();
            return userDB;
        }

        public bool ValidateUserPassword(Guid id, string hashedPassword)
        {
            var user = _dataContext.Users.FirstOrDefault(x => x.Id == id && hashedPassword.Equals(x.Password));
            if(user is null)
                return false;
            return true;
        }
    }
}