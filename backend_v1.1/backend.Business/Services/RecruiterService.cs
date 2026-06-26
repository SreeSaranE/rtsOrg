using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Business.Services
{
    public class RecruiterService: IRecruiterService
    {
        private readonly IJobRepository _jobRepository;
        public RecruiterService(IJobRepository repository)
        {
            _jobRepository = repository;
        }

        public async Task<Boolean> AddJob(AddJob job)
        {
            var existJob = await _jobRepository.CheckJob(job.Name, job.Dept);

            if(existJob) return false;

            var jobData = new Job
            {
                Name = job.Name,
                Dept = job.Dept,
                CreatedBy = job.CreatedBy
            };
            await _jobRepository.AddJob(jobData);
            return true;
        }
    }
}
