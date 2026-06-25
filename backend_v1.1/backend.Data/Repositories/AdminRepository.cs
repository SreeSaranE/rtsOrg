using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AppDbContext _context;
        public AdminRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<UserDetails>> GetAllUsers()
        {
            return await _context.Users
                .Select(u => new UserDetails
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    Role = u.Role,
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                }).ToListAsync();
        }
    }
}
