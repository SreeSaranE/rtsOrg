using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Data.Interfaces
{
    public interface ICandidateRepository
    {
        Task<Candidate?> GetCandidateById(Guid candId);

        Task<Candidate?> GetCandidateByEmail(string email);

        Task<IReadOnlyList<CandidateDetails>> GetAllCandidates();

        Task RegisterCandidate(Candidate candidate);

        Task UpdateCandidate();

        Task DeleteCandidate(Candidate candidate);

    }
}
