using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository _repository;
        public AdminService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IReadOnlyList<UserDetailsDTO>> GetAllUsers()
        {
            return await _repository.GetAllUsers();
        }

        public async Task<bool> AlterUserStatus(Guid id)
        {
            var user = await _repository.GetById(id);
            if (user == null) return false;
            await _repository.AlterUserStatus(user);
            return true;
        }

        public async Task<bool> DeleteUser(Guid userId)
        {
            var user = await _repository.GetById(userId);
            if(user == null) return false;
            await _repository.DeleteUser(user);
            return true;
        }
    }
}
