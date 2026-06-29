using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IRecruiterService
    {
        public Task<Boolean> AddJob(JobRegisterDTO job);

        public Task<Boolean> AlterJobStatus(Guid jobId);

        public Task<IReadOnlyList<JobDetailsDTO>> GetAllJobs();

        public Task<Boolean> DeleteJob(Guid jobId);
    }
}
