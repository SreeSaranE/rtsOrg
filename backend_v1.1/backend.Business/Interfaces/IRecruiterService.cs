using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IRecruiterService
    {
        public Task<Boolean> AddJob(AddJob job);

        public Task<Boolean> AlterJobStatus(Guid jobId);

        public Task<Boolean> DeleteJob(Guid jobId);
    }
}
