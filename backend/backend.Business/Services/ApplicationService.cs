using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using backend.Models.Enum;

namespace backend.Business.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationRepository _applicationRepository;
        private readonly ICandidateRepository _candidateRepository;
        private readonly IJobRepository _jobRepository;
        public ApplicationService(
            IApplicationRepository repository,
            ICandidateRepository candidateRepository,
            IJobRepository jobRepository)
        { 
            _applicationRepository = repository;
            _candidateRepository = candidateRepository;
            _jobRepository = jobRepository;
        }

        public async Task<bool> AddApplication(Guid jobId, Guid candId)
        {
            var existApplication = await _applicationRepository.GetApplication(jobId, candId);
            if (existApplication != null) return false;

            var application = new JobApplication
            {
                JobId = jobId,
                CandidateId = candId
            };

            await _applicationRepository.AddApplication(application);
            return true;
        }

        public async Task<IReadOnlyList<ApplicationResponseDTO>> GetAllApplication()
        {
            var applications = await _applicationRepository.GetAllApplication();

            var response = new List<ApplicationResponseDTO>();

            foreach (var application in applications)
            {
                var candidate = await _candidateRepository.GetCandidateById(application.CandidateId);
                var job = await _jobRepository.GetJobById(application.JobId);

                response.Add(new ApplicationResponseDTO
                {
                    JobApplicationId = application.JobApplicationId,
                    JobId = application.JobId,
                    CandidateId = application.CandidateId,
                    CandidateName = candidate?.Name,
                    JobName = job?.Name,
                    Stage = ((ApplicationStage)application.Stage).ToString(),
                    CreatedAt = application.CreatedAt
                });
            }

            return response;
        }

        public async Task<IReadOnlyList<ApplicationResponseDTO>> GetCandidateApplications(Guid candId)
        {
            var applications = await _applicationRepository.CandidateApplications(candId);

            var response = new List<ApplicationResponseDTO>();

            foreach (var application in applications)
            {
                var candidate = await _candidateRepository.GetCandidateById(application.CandidateId);
                var job = await _jobRepository.GetJobById(application.JobId);

                response.Add(new ApplicationResponseDTO
                {
                    JobApplicationId = application.JobApplicationId,
                    JobId = application.JobId,
                    CandidateId = application.CandidateId,
                    CandidateName = candidate?.Name,
                    JobName = job?.Name,
                    Stage = ((ApplicationStage)application.Stage).ToString(),
                    CreatedAt = application.CreatedAt
                });
            }

            return response;
        }

        public async Task<int> UpdateApplicationStage(UpdateStageDTO stage)
        {
            var applicaiton = await _applicationRepository.GetApplicationById(stage.ApplicationId);
            if (applicaiton == null) return 2;

            int stageId = (int)Enum.Parse<ApplicationStage>(stage.Stage);

            if (stageId == applicaiton.Stage) return 3;

            int oldStage = applicaiton.Stage;
            var historyData = new ApplicationHistory
            {
                ApplicationId = stage.ApplicationId,
                NewStage = stageId,
                OldStage = oldStage,
                CreatedBy = stage.ModifiedBy
            };
            await _applicationRepository.AddApplicationHistory(historyData);

            applicaiton.Stage = stageId;
            await _applicationRepository.UpdateStage();
            return 1;
        }


        public async Task<bool> DeleteApplication(Guid applicationId)
        {
            var application = await _applicationRepository.GetApplicationById(applicationId);
            if (application == null) return false;

            await _applicationRepository.DeleteApplication(application);
            return true;
        }


    }
}