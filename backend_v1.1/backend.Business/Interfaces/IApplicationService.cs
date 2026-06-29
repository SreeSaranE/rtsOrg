using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IApplicationService
    {
        Task<bool> AddApplication(Guid jobId, Guid candId);

        Task<int> UpdateApplicationStage(UpdateStageDTO stage);

        Task<IReadOnlyList<CandidateApplicationDTO>> GetCandidateApplications(Guid candId);

        Task<bool> DeleteApplication(Guid applicationId);

    }
}
