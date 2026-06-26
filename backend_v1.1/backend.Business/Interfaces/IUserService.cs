using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IUserService
    {
        public Task<UserLoginResponse> Login(UserLogin dto);

        public Task<bool> RegisterUser(UserRegister dto);

        public Task<bool> CheckEmail(string email);
    }
}