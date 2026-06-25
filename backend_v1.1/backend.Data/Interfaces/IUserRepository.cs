using backend.Models.DataBase;

namespace backend.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id);

        Task<User?> GetByEmail(string email);

        Task<bool> CheckEmail(string email);

        Task AddUser(User user);
    }
}