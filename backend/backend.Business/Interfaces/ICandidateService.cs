using backend.Models.DTOs;

namespace backend.Business.Interfaces
{
    public interface ICandidateService
    {
        Task<UserLoginResponseDTO> Login(UserLoginDTO dto);

        public Task<bool> RegisterCandidate(CandidateRegisterDTO dto);

        public Task<CandidateDetailsDTO> GetCandidateById(Guid candId);

        public Task<IReadOnlyList<CandidateDetailsDTO>> GetAllCandidatets();

        public Task<bool> UpdateCandidate(CandidateDetailsDTO dto);

        public Task<bool> DeleteCandidate(Guid candId);
    }
}
