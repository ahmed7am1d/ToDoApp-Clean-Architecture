using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;

namespace ToDo.Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DataContext()
        {

        }

        //EF Core Mapping Configuration
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}