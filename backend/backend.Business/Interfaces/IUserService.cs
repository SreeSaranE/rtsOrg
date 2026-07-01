using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IUserService
    {
        public Task<UserLoginResponseDTO> Login(UserLoginDTO dto);

        public Task<bool> RegisterUser(UserRegisterDTO dto);

        public Task<bool> CheckEmail(string email);
    }
}