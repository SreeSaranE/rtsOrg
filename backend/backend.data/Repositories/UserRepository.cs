using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using backend.Models.Enum;
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

        public async Task<User?> GetById(Guid id)
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

        public async Task<IReadOnlyList<UserDetailsDTO>> GetAllUsers()
        {
            return await _context.Users
                .Select(u => new UserDetailsDTO
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    Role = ((UserRole)u.Role).ToString(),
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                }).ToListAsync();
        }

        public async Task AlterUserStatus(User user)
        {
            user.IsActive = !user.IsActive;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}