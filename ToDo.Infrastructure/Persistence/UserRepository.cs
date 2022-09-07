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
        // it is static because we don't want to create a new list every time we create a new instance of the user repository
        //because we want to use the same list for all the instances of the user repository (and we will AddScoped)
        private static readonly List<User> _users = new();
        public void Add(User user)
        {
            _users.Add(user);
        }

        public User? GetUserByEmail(string email)
        {
           return  _users.FirstOrDefault(user => user.Email == email);
        }
    }
}