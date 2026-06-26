using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;


namespace backend.Data.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly AppDbContext _context;

        public JobRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddJob(Job job)
        {
            await _context.Jobs.AddAsync(job);
            await _context.SaveChangesAsync();
        }

        public async Task<Boolean> CheckJob(string name, string dept)
        {
            var job = await _context.Jobs.
                FirstOrDefaultAsync(x => (x.Name == name && x.Dept == dept));
            if (job == null) return false;
            return true;
        }

        public async Task<Job> GetJobById(Guid id)
        {
            return await _context.Jobs.FindAsync(id);
        }

        public async Task<IReadOnlyList<JobDetails>> GetAllJob()
        {
            return await _context.Jobs
                .Select(j => new  JobDetails
                {
                    JobId = j.JobId,
                    Name = j.Name,
                    Dept = j.Dept,
                    JobStatus = j.JobStatus,
                    CreatedBy = j.CreatedBy,
                    CreatedAt = j.CreatedAt,
                }).ToListAsync();
        }

        public async Task AlterJobStatus(Job job)
        {
            job.JobStatus = !job.JobStatus;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }
    }
}
