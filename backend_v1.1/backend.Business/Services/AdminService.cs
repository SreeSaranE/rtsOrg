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

        public async Task<IReadOnlyList<UserDetails>> GetAllUsers()
        {
            return await _repository.GetAllUsers();
        }

        public async Task<bool> AlterUserStatus(Guid id)
        {
            return await _repository.AlterUserStatus(id);
        }
    }
}
