using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class RecruiterService : IRecruiterService
    {
        private readonly IJobRepository _jobRepository;
        public RecruiterService(IJobRepository repository)
        {
            _jobRepository = repository;
        }

        public async Task<Boolean> AddJob(JobRegisterDTO job)
        {
            var existJob = await _jobRepository.CheckJob(job.Name, job.Dept);

            if (existJob) return false;

            var jobData = new Job
            {
                Name = job.Name,
                Dept = job.Dept,
                CreatedBy = job.CreatedBy
            };
            await _jobRepository.AddJob(jobData);
            return true;
        }

        public async Task<Boolean> AlterJobStatus(Guid jobId)
        {
            var job = await _jobRepository.GetJobById(jobId);
            if (job == null) return false;
            await _jobRepository.AlterJobStatus(job);
            return true;
        }

        public async Task<IReadOnlyList<JobDetailsDTO>> GetAllJobs()
        {
            return await _jobRepository.GetAllJob();
        }

        public async Task<Boolean> DeleteJob(Guid jobId)
        {
            var job = await _jobRepository.GetJobById(jobId);
            if (job == null) return false;
            await _jobRepository.DeleteJob(job);
            return true;
        }
    }
}