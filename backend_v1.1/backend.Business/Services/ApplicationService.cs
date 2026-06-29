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
        public ApplicationService(IApplicationRepository repository)
        { _applicationRepository = repository; }

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

        public async Task<IReadOnlyList<CandidateApplicationDTO>> GetCandidateApplications(Guid candId)
        {
            return await _applicationRepository.CandidateApplications(candId);
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