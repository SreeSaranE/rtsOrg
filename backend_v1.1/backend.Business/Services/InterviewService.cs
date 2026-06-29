using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class InterviewService : IInterviewService
    {
        private readonly IInterviewRepository _interviewRepository;
        public InterviewService(IInterviewRepository interviewRepository)
        { _interviewRepository = interviewRepository; }

        public async Task<bool> ScheduleInterview(Interview interview)
        {

            if (await _interviewRepository.HasScheduleConflict(
                    interview.InterviewerId,
                    interview.StartTime,
                    interview.EndTime))
            {
                return false;
            }

            await _interviewRepository.ScheduleInterview(interview);
            return true;
        }

        public async Task<int> UpdateInterview(InterviewResponseDTO dto)
        {
            var interview = await _interviewRepository.GetInterviewById(dto.InterviewId);
            if (interview == null) return 3;

            Guid interviewer = dto.InterviewerId ?? interview.InterviewerId;
            DateTime startTime = dto.StartTime ?? interview.StartTime;
            DateTime endTime = dto.EndTime ?? interview.EndTime;

            bool scheduleChanged =
                interviewer != interview.InterviewerId ||
                startTime != interview.StartTime ||
                endTime != interview.EndTime;

            if (scheduleChanged &&
                await _interviewRepository.HasScheduleConflict(
                    interviewer,
                    startTime,
                    endTime,
                    interview.InterviewId))
            {
                return 2;
            }

            interview.InterviewerId = dto.InterviewerId ?? interview.InterviewerId;
            interview.StartTime = dto.StartTime ?? interview.StartTime;
            interview.EndTime = dto.EndTime ?? interview.EndTime;
            interview.Result = dto.Result ?? interview.Result;

            await _interviewRepository.UpdateInterview();
            return 1;
        }

        public async Task<bool> DeleteInterview(Guid interviewId)
        {
            var interview = await _interviewRepository.GetInterviewById(interviewId);
            if (interview == null) return false;

            await _interviewRepository.DeleteInterview(interview);
            return true;
        }
    }
}