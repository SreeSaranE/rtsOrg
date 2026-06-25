using backend.Models.DTOs;
using backend.Models.DataBase;

namespace backend.Data.Interfaces
{
    public interface IAdminRepository
    {
        Task<IReadOnlyList<UserDetails>> GetAllUsers();

        Task<bool> AlterUserStatus(int id);
    }
}
