using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly ICandidateRepository _candidateRepository;
        public CandidateService(ICandidateRepository candidateRepository)
        { _candidateRepository = candidateRepository; }

        public async Task<bool> RegisterCandidate(CandidateRegister dto)
        {
            var existCandidate = await _candidateRepository.GetCandidateByEmail(dto.Email);
            if (existCandidate != null) return false;

            var data = new Candidate
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _candidateRepository.RegisterCandidate(data);
            return true;
        }

        public async Task<IReadOnlyList<CandidateDetails>> GetAllCandidatets()
        {
            return await _candidateRepository.GetAllCandidates();
        }

        public async Task<bool> UpdateCandidate(CandidateDetails dto)
        {
            var candidate = await _candidateRepository.GetCandidateById(dto.CandidateId);
            if (candidate == null) return false;

            candidate.Name = dto.Name ?? candidate.Name;
            candidate.Email = dto.Email ?? candidate.Email;
            candidate.Phone = dto.Phone ?? candidate.Phone;
            candidate.Resume = dto.Resume ?? candidate.Resume;
            candidate.Stage = dto.Stage ?? candidate.Stage;
            candidate.Status = dto.Status ?? candidate.Status;
            candidate.DateOdBirth = dto.DateOdBirth ?? candidate.DateOdBirth;
            candidate.Skills = dto.Skills ?? candidate.Skills;
            candidate.Summary = dto.Summary ?? candidate.Summary;
            candidate.Education = dto.Education ?? candidate.Education;
            candidate.Location = dto.Location ?? candidate.Location;

            await _candidateRepository.UpdateCandidate();
            return true;
        }

        public async Task<bool> DeleteCandidate(Guid candId)
        {
            var candidate = await _candidateRepository.GetCandidateById(candId);
            if (candidate == null) return false;

            await _candidateRepository.DeleteCandidate(candidate);
            return true;
        }
    }
}