using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IApplicationService
    {
        Task<bool> AddApplication(Guid jobId, Guid candId);

        Task<bool> UpdateApplication(UpdateStageDTO stage);

        Task<bool> DeleteApplication(Guid applicationId);

    }
}
