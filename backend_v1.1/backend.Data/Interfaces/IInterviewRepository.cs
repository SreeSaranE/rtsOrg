using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Data.Interfaces
{
    public interface IInterviewRepository
    {
        Task ScheduleInterview(Interview interview);

        Task<Interview?> GetInterviewById(Guid interviewId);

        Task UpdateInterview();

        Task<IReadOnlyList<InterviewResponseDTO?>> GetInterviews(Guid interviewerId);

        Task<bool> HasScheduleConflict(Guid interviewerId, DateTime startTime, DateTime endTime, Guid? excludeInterviewId = null);

        Task DeleteInterview(Interview interview);
    }
}
