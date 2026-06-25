using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IUserService
    {
        public Task<LoginResponse> Login(Login dto);

        public Task<bool> RegisterUser(Register dto);

        public Task<bool> CheckEmail(string email);
    }
}