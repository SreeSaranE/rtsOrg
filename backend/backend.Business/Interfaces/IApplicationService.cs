using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IApplicationService
    {
        Task<bool> AddApplication(Guid jobId, Guid candId);

        Task<int> UpdateApplicationStage(UpdateStageDTO stage);

        Task<IReadOnlyList<ApplicationResponseDTO>> GetAllApplication();

        Task<IReadOnlyList<ApplicationResponseDTO>> GetCandidateApplications(Guid candId);

        Task<bool> DeleteApplication(Guid applicationId);

    }
}
