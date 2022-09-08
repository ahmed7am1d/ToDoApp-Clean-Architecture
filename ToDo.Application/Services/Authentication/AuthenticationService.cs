using ErrorOr;
using ToDo.Application.Common.Errors;
using ToDo.Application.Common.Interfaces.Authentication;
using ToDo.Application.Common.Interfaces.Persistence;
using ToDo.Domain.Common.Errors;
using ToDo.Domain.Entities;
namespace ToDo.Application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;
        /* This is the constructor for the AuthenticationService class. It is taking in two parameters, an
        IJwtTokenGenerator and an IUserRepository. */
        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
        }

        /// <summary>
        /// This function registers a new user with the given information
        /// </summary>
        /// <param name="firstName">First name of the user</param>
        /// <param name="lastName">"Smith"</param>
        /// <param name="email">The email address of the user.</param>
        /// <param name="password">The password for the new user.</param>
        /// <param name="phoneNumber">+11234567890</param>
        public ErrorOr<AuthenticationResult> Register(string firstName, string lastName, string email, string password, string phoneNumber)
        {
            //[1] Validate user does not exist
            if (_userRepository.GetUserByEmail(email) is not null)
            {
                return Errors.User.DuplicateEmail;
            }
            //[2]Create user (generate unique Id) & Persist to DB
            var user = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = password,
                PhoneNumber = phoneNumber
            };
            _userRepository.Add(user);
            //[3] Create JWT token
            var token = _jwtTokenGenerator.GenerateToken(user);
            //[4] Return AuthenticationResult
            return new AuthenticationResult(user, token);
        }

        /// <summary>
        /// This function takes in a string email and a string password and returns an AuthenticationResult
        /// </summary>
        /// <param name="email">The email address of the user.</param>
        /// <param name="password">"password"</param>
        public ErrorOr<AuthenticationResult> Login(string email, string password)
        {
            //[1] Validate user exists and password is correct
            if (_userRepository.GetUserByEmail(email) is not User user || user.Password != password)
            {
                return new[] {Errors.Authentication.InvalidCredentials};
            }

            //[2] Create JWT token
            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(
             user,
             token);
        }
    }
}