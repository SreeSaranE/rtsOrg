using backend.Data.Context;
using backend.Data.Interfaces;
using backend.Data.Migrations;
using backend.Models.DataBase;
using backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repositories
{
    public class InterviewRepository : IInterviewRepository
    {
        private readonly AppDbContext _context;
        public InterviewRepository(AppDbContext context)
        { _context = context; }

        public async Task ScheduleInterview(Interview interview)
        {
            await _context.Interviews.AddAsync(interview);
            await _context.SaveChangesAsync();
        }

        public async Task<Interview?> GetInterviewById(Guid interviewId)
        {
            return await _context.Interviews.FindAsync(interviewId);
        }

        public async Task UpdateInterview()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<InterviewDetailsDTO>> GetAllInterviews()
        {
            return await _context.Interviews
                .Select(i => new InterviewDetailsDTO
                {
                    InterviewId = i.InterviewId,
                    JobApplicationId = i.JobApplicationId,

                    JobName = i.JobApplication!.Job!.Name,
                    candidateName = i.JobApplication.Candidate!.Name,

                    InterviewerId = i.InterviewerId,
                    InterviewerName = i.Interviewer!.Name,

                    StartTime = i.StartTime,
                    EndTime = i.EndTime,

                    Result = i.Result.ToString(),

                    CreatedBy = i.CreatedBy,
                    CreatedAt = i.CreatedAt,
                })
                .ToListAsync();
        }

        public async Task<IReadOnlyList<InterviewDetailsDTO?>> assignedInterviews(Guid interviewerId)
        {
            return await _context.Interviews
                .Where(i => i.InterviewerId == interviewerId)
                .Select(i => new InterviewDetailsDTO
                {
                    InterviewId = i.InterviewId,
                    JobApplicationId = i.JobApplicationId,

                    JobName = i.JobApplication!.Job!.Name,
                    candidateName = i.JobApplication.Candidate!.Name,

                    InterviewerId = i.InterviewerId,
                    InterviewerName = i.Interviewer!.Name,

                    StartTime = i.StartTime,
                    EndTime = i.EndTime,

                    Result = i.Result.ToString(),

                    CreatedBy = i.CreatedBy,
                    CreatedAt = i.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<bool> HasScheduleConflict(
            Guid interviewerId,
            DateTime startTime,
            DateTime endTime,
            Guid? excludeInterviewId = null)
        {
            return await _context.Interviews.AnyAsync(i =>
                i.InterviewerId == interviewerId &&
                (!excludeInterviewId.HasValue || i.InterviewId != excludeInterviewId.Value) &&
                startTime < i.EndTime &&
                endTime > i.StartTime);
        }

        public async Task DeleteInterview(Interview interview)
        {
            _context.Interviews.Remove(interview);
            await _context.SaveChangesAsync();
        }
    }
}