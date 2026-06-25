using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DTOs;
using backend.Models.Enum;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserRepository _userRepository;
        public AdminRepository(
            AppDbContext context,
            IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public async Task<IReadOnlyList<UserDetails>> GetAllUsers()
        {
            return await _context.Users
                .Select(u => new UserDetails
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    Role = ((UserRole)u.Role).ToString(),
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                }).ToListAsync();
        }

        public async Task<bool> AlterUserStatus(int id)
        {
            var user = await _userRepository.GetById(id);
            if (user == null) return false;

            user.IsActive = !user.IsActive;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
