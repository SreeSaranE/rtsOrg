using backend.Models;

namespace backend.data.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id);

        Task<User?> GetByEmail(string email);

        Task AddUser(User user);

        Task UpdateUser(User user);

        Task DeleteUser(int id);
    }
}
