using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<IReadOnlyList<UserDetails>> GetAllUsers()
        {
            return await _adminRepository.GetAllUsers();
        }

        public async Task<bool> AlterUserStatus(int id)
        {
            return await _adminRepository.AlterUserStatus(id);
        }
    }
}
