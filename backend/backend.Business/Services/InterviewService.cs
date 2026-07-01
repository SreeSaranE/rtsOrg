using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Data.Repositories;
using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class InterviewService : IInterviewService
    {
        private readonly IInterviewRepository _interviewRepository;
        private readonly IUserRepository _userRepository;
        private readonly IApplicationRepository _applicationRepository;
        public InterviewService(
            IInterviewRepository interviewRepository,
            IUserRepository userRepository,
            IApplicationRepository applicationRepository)
        {
            _interviewRepository = interviewRepository;
            _userRepository = userRepository;
            _applicationRepository = applicationRepository;
        }

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

            var interviewer = dto.InterviewerId ?? interview.InterviewerId;
            var startTime = dto.StartTime ?? interview.StartTime;
            var endTime = dto.EndTime ?? interview.EndTime;

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

            ApplyInterviewUpdates(interview, dto);

            await _interviewRepository.UpdateInterview();
            return 1;
        }
        //helper
        private void ApplyInterviewUpdates(Interview interview, InterviewResponseDTO dto)
        {
            interview.InterviewerId = dto.InterviewerId ?? interview.InterviewerId;
            interview.StartTime = dto.StartTime ?? interview.StartTime;
            interview.EndTime = dto.EndTime ?? interview.EndTime;

            if (!string.IsNullOrWhiteSpace(dto.Result) &&
                Enum.TryParse<backend.Models.Enum.Result>(dto.Result, true, out var result))
            {
                interview.Result = result;
            }
        }

        public async Task<IReadOnlyList<InterviewDetailsDTO>> assignedInterviews(Guid interviewerId)
        {
            var interviews = await _interviewRepository.assignedInterviews(interviewerId);

            foreach (var interview in interviews)
            {
                var interviewer = await _userRepository.GetById(interview.InterviewerId);
                interview.InterviewerName = interviewer?.Name;

                interview.JobName = await _applicationRepository.GetJobNameByApplicationId(interview.JobApplicationId);
            }

            return interviews;
        }

        public async Task<IReadOnlyList<InterviewDetailsDTO>> GetAllInterviews()
        {
            var interviews = await _interviewRepository.GetAllInterviews();

            foreach (var interview in interviews)
            {
                var interviewer = await _userRepository.GetById(interview.InterviewerId);
                interview.InterviewerName = interviewer?.Name;

                interview.JobName = await _applicationRepository.GetJobNameByApplicationId(interview.JobApplicationId);
            }

            return interviews;
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