using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
           return  _dataContext.Users.FirstOrDefault(user => user.Email == email);
        }
    }
}