using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IRecruiterService
    {
        public Task<Boolean> AddJob(JobRegister job);

        public Task<Boolean> AlterJobStatus(Guid jobId);

        public Task<IReadOnlyList<JobDetails>> GetAllJobs();

        public Task<Boolean> DeleteJob(Guid jobId);
    }
}
