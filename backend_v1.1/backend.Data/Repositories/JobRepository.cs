using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Models.DataBase;
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
