using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Application.Common.Services;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ToDo.Infrastructure.Services
{
    public class PasswordEncoder : IPasswordEncoder
    {
        public string GetHashedPassword(string password)
        {
            SHA512 sHA512 = SHA512.Create();
            byte[] hashedPassword = sHA512.ComputeHash(Encoding.Default.GetBytes(password));
            StringBuilder returnValue = new StringBuilder();
            for(int i = 0; i< hashedPassword.Length;i++)
            {
                returnValue.Append(hashedPassword[i].ToString());
            }
            return returnValue.ToString();
        }
    }
}
