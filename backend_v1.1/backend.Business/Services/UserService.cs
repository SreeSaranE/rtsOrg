using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DTOs;
using backend.Models.DataBase;
using backend.Models.Enum;

namespace backend.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IJwtService _jwtService;

        public UserService(
            IUserRepository repository,
            IJwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        public async Task<LoginResponse> Login(Login dto)
        {
            var user = await _repository.GetByEmail(dto.Email);
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

            return new LoginResponse
            {
                Token = _jwtService.GenerateToken(user),
            };      
        }

        public async Task<bool> RegisterUser(Register dto)
        {
            var existUser = await _repository.GetByEmail(dto.Email);

            if (existUser != null)
            {
                return false;
            }

            UserRole role = Enum.Parse<UserRole>(dto.Role);

            int roleId = (int)role;

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = roleId,
                IsActive = dto.IsActive
            };

            await _repository.AddUser(user);
            return true;
        }
    }
}