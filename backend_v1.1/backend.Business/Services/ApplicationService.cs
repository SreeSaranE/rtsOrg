using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using backend.Models.Enum;

namespace backend.Business.Services
{
    public class ApplicationService: IApplicationService
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

        public async Task<bool> UpdateApplication(UpdateStageDTO stage)
        {
            var applicaiton = await _applicationRepository.GetApplicationById(stage.ApplicationId);
            if (applicaiton != null)
            {
                int stageId = (int)Enum.Parse<CandidateStage>(stage.Stage);
                applicaiton.Stage = stageId;
                await _applicationRepository.UpdateStage();
                return true;
            }return false;
        }

        public async Task<bool> DeleteApplication(Guid applicationId)
        {
            var application = await _applicationRepository.GetApplicationById(applicationId);
            if(application == null) return false;

            await _applicationRepository.DeleteApplication(application);
            return true;
        }


    }
}