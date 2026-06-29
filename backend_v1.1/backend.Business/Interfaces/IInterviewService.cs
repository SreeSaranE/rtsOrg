using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IInterviewService
    {
        Task<bool> ScheduleInterview(Interview interview);

        Task<int> UpdateInterview(InterviewResponseDTO dto);

        Task<bool> DeleteInterview(Guid interviewId);
    }
}