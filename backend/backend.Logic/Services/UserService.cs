using backend.data.DTOs;
using backend.data.Interfaces;
using backend.Models;
using backend.Service.Interfaces;

namespace backend.Service.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> RegisterUser(RegisterDto dto)
        {
            var existUser = await _userRepository.GetByEmail(dto.Email);

            if (existUser != null)
            {
                return false;
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };

            await _userRepository.AddUser(user);
            return true;
        }

        public async Task<User?> Login(LoginDto dto)
        {
            var user = await _userRepository.GetByEmail(dto.Email);

            if (user == null)
            {
                return null;
            }
            bool isValidPassword =
                BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;
        }
    }
}
