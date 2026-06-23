using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DTOs;
using backend.Models.DataBase;

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

        public async Task<bool> Login(string email)
        {
            var data = await _repository.GetByEmail(email);
            if (data == null)
            {
                return false;
            }return true;
        }

        public async Task<bool> RegisterUser(Register dto)
        {
            var existUser = await _repository.GetByEmail(dto.Email);

            if (existUser != null)
            {
                return false;
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role,
                IsActive = dto.IsActive
            };

            await _repository.AddUser(user);
            return true;
        }
    }
}