using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
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

        public async Task<IReadOnlyList<ApplicationDetailsDTO>> GetAllApplication()
        {
            return await _context.JobApplications
                .Select(a => new  ApplicationDetailsDTO
                {
                    JobApplicationId = a.JobApplicationId,
                    JobId = a.JobId,
                    CandidateId = a.CandidateId,
                    Stage  = a.Stage,
                    CreatedAt = a.CreatedAt
                }).ToListAsync();
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

        public async Task<string?> GetJobNameByApplicationId(Guid applicationId)
        {
            return await _context.JobApplications
                .Where(a => a.JobApplicationId == applicationId)
                .Join(
                    _context.Jobs,
                    app => app.JobId,
                    job => job.JobId,
                    (app, job) => job.Name
                )
                .FirstOrDefaultAsync();
        }

        public async Task UpdateStage()
        { await _context.SaveChangesAsync(); }

        public async Task<IReadOnlyList<ApplicationDetailsDTO>> CandidateApplications(Guid candId)
        {
            return await _context.JobApplications
                .Where(a => a.CandidateId == candId)
                .Select(a => new ApplicationDetailsDTO
                {
                    JobApplicationId = a.JobApplicationId,
                    JobId = a.JobId,
                    CandidateId = a.CandidateId,
                    Stage = a.Stage,
                    CreatedAt = a.CreatedAt
                }).ToListAsync();
        }

        public async Task DeleteApplication(JobApplication application)
        {
            _context.JobApplications.Remove(application);
            await _context.SaveChangesAsync();
        }

        //---------------------------------------------------------------------------------

        public async Task AddApplicationHistory(ApplicationHistory data)
        {
            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
        }
    }
}