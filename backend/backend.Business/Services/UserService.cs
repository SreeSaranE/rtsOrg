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

        public async Task<UserLoginResponseDTO> Login(UserLoginDTO dto)
        {
            var user = await _repository.GetByEmail(dto.Email);
            if (user == null)
            {                
                return new UserLoginResponseDTO
                {
                    Token = "",
                    State = "incorrectEmail"
                };
            }

            bool isValidPassword = 
                BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!isValidPassword)
            {
                return new UserLoginResponseDTO
                {
                    Token = "",
                    State = "incorrectPassword"
                };
            }

            return new UserLoginResponseDTO
            {
                Token = _jwtService.GenerateToken(user),
                State = "Login Success"
            };      
        }

        public async Task<bool> RegisterUser(UserRegisterDTO dto)
        {
            var existUser = await _repository.GetByEmail(dto.Email);

            Console.WriteLine(existUser);
            if (existUser != null)
            {
                return false;
            }

            int roleId = (int)(Enum.Parse<UserRole>(dto.Role));

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

        public async Task<bool> CheckEmail(string email)
        {
            return await _repository.CheckEmail(email);
        }

        public async Task<bool> DeleteUser(Guid userId)
        {
            var user = await _repository.GetById(userId);
            if (user == null) return false;

            await _repository.DeleteUser(user);
            return true;
        }
    }
}