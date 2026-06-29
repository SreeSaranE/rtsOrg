using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IAdminService
    {
        public Task<IReadOnlyList<UserDetailsDTO>> GetAllUsers();

        public Task<bool> AlterUserStatus(Guid id);

        public Task<bool> DeleteUser(Guid userId);
    }
}
