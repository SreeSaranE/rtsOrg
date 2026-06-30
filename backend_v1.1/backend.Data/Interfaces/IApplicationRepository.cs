using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Data.Interfaces
{
    public interface IApplicationRepository
    {
        Task AddApplication(JobApplication application);

        Task<JobApplication?> GetApplication(Guid jobId, Guid candId);

        Task<JobApplication?> GetApplicationById(Guid applicationId);

        Task UpdateStage();

        Task<IReadOnlyList<ApplicationDetailsDTO>> GetAllApplication();

        Task<IReadOnlyList<CandidateApplicationDTO>> CandidateApplications(Guid candId);

        Task AddApplicationHistory(ApplicationHistory data);

        Task DeleteApplication(JobApplication application);
    }
}
