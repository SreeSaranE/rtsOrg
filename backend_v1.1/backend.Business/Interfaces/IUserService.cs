using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IUserService
    {
        public Task<bool> Login(string email);
        public Task<bool> RegisterUser(Register dto);
    }
}
