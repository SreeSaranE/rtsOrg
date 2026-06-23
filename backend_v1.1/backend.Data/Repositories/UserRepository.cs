using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users.
                FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
        }

        public async Task<bool> CheckEmail(string email)
        {
            return await _context.Users
                .AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
