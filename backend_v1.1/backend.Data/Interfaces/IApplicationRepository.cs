using backend.Models.DataBase;

namespace backend.Data.Interfaces
{
    public interface IApplicationRepository
    {
        Task AddApplication(JobApplication application);

        Task<JobApplication?> GetApplication(Guid jobId, Guid candId);

        Task<JobApplication?> GetApplicationById(Guid applicationId);

        Task UpdateStage();

        Task DeleteApplication(JobApplication application);
    }
}
