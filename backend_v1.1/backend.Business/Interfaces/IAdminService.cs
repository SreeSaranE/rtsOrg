using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IAdminService
    {
        public Task<IReadOnlyList<UserDetails>> GetAllUsers();

        public Task<bool> AlterUserStatus(Guid id);

        public Task<bool> DeleteUser(Guid userId);
    }
}
