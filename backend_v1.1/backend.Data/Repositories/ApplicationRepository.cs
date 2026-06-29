using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly AppDbContext _context;
        public ApplicationRepository(AppDbContext context)
        { _context = context; }

        public async Task AddApplication(JobApplication application)
        {
            await _context.JobApplications.AddAsync(application);
            await _context.SaveChangesAsync();
        }

        public async Task<JobApplication?> GetApplication(Guid jobId, Guid candId)
        {
            return await _context.JobApplications
                .FirstOrDefaultAsync(a => (a.JobId == jobId && a.CandidateId == candId));
            
        }

        public async Task<JobApplication?> GetApplicationById(Guid applicationId)
        {
            return await _context.JobApplications.FindAsync(applicationId);
        }

        public async Task UpdateStage()
        {  await _context.SaveChangesAsync(); }

        public async Task DeleteApplication(JobApplication application)
        {
            _context.JobApplications.Remove(application);
            await _context.SaveChangesAsync();
        }
    }
}
