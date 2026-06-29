using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repositories
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly AppDbContext _context;
        public CandidateRepository(AppDbContext context)
        { _context = context; }

        public async Task<Candidate?> GetCandidateById(Guid candId)
        { return await _context.Candidates.FindAsync(candId); }

        public async Task<Candidate?> GetCandidateByEmail(string email)
        {
            return await _context.Candidates
                .FirstOrDefaultAsync(
                c => c.Email.ToLower() == email.ToLower());
        }

        public async Task<IReadOnlyList<CandidateDetailsDTO>> GetAllCandidates()
        {
            return await _context.Candidates
                .Select(c => new CandidateDetailsDTO
                {
                    CandidateId = c.CandidateId,
                    Name = c.Name,
                    Email = c.Email,
                    Phone = c.Phone,
                    Resume = c.Resume,
                    ActiveStatus = c.ActiveStatus,
                    DateOdBirth = c.DateOdBirth,
                    Skills = c.Skills,
                    Summary = c.Summary,
                    Education = c.Education,
                    Location = c.Location,
                    CreatedAt = c.CreatedAt
                }).ToListAsync();
        }

        public async Task RegisterCandidate(Candidate candidate)
        {
            await _context.Candidates.AddAsync(candidate);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCandidate()
        { _context.SaveChanges(); }

        public async Task DeleteCandidate(Candidate candidate)
        {
            _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();
        }

    }
}