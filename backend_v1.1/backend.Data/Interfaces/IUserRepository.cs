using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetById(Guid id);

        Task<User?> GetByEmail(string email);

        Task<bool> CheckEmail(string email);

        Task AddUser(User user);

        Task<IReadOnlyList<UserDetailsDTO>> GetAllUsers();

        Task AlterUserStatus(User user);

        Task DeleteUser(User user);
    }
}