using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface IRecruiterService
    {
        public Task<Boolean> AddJob(AddJob job);
    }
}
