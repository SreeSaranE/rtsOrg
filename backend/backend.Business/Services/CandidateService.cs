using backend.Business.Interfaces;
using backend.Data.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Business.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IJwtService _jwtService;
        public CandidateService(
            ICandidateRepository candidateRepository,
             IJwtService jwtService)
        { 
            _candidateRepository = candidateRepository;
            _jwtService = jwtService;
        }

        public async Task<UserLoginResponseDTO> Login(UserLoginDTO dto)
        {
            var candidate = await _candidateRepository.GetCandidateByEmail(dto.Email);
            if (candidate == null)
            {
                return new UserLoginResponseDTO
                {
                    Token = "",
                    State = "incorrectEmail"
                };
            }

            bool isValidPassword =
                BCrypt.Net.BCrypt.Verify(dto.Password, candidate.PasswordHash);
            if (!isValidPassword)
            {
                return new UserLoginResponseDTO
                {
                    Token = "",
                    State = "incorrectPassword"
                };
            }

            return new UserLoginResponseDTO
            {
                Token = _jwtService.CandidateGenerateToken(candidate),
                State = "Login Success"
            };
        }

        public async Task<CandidateDetailsDTO> GetCandidateById(Guid candId)
        {
            var candidate = await _candidateRepository.GetCandidateById(candId);
            return new CandidateDetailsDTO
            {
                CandidateId = candId,
                Name = candidate.Name,
                Email = candidate.Email,
                Phone = candidate.Phone,
                Resume = candidate.Resume,
                ActiveStatus = candidate.ActiveStatus,
                DateOdBirth = candidate.DateOdBirth,
                Skills = candidate.Skills,
                Summary = candidate.Summary,
                Education = candidate.Education,
                Location = candidate.Location,
                CreatedAt = candidate.CreatedAt,
            };
        }

        public async Task<bool> RegisterCandidate(CandidateRegisterDTO dto)
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

        public async Task<IReadOnlyList<CandidateDetailsDTO>> GetAllCandidatets()
        {
            return await _candidateRepository.GetAllCandidates();
        }

        public async Task<bool> UpdateCandidate(CandidateDetailsDTO dto)
        {
            var candidate = await _candidateRepository.GetCandidateById(dto.CandidateId);
            if (candidate == null) return false;

            candidate.Name = string.IsNullOrWhiteSpace(dto.Name)
                ? candidate.Name
                : dto.Name;

            candidate.Email = string.IsNullOrWhiteSpace(dto.Email)
                ? candidate.Email
                : dto.Email;

            candidate.Phone = string.IsNullOrWhiteSpace(dto.Phone)
                ? candidate.Phone
                : dto.Phone;

            candidate.Resume = string.IsNullOrWhiteSpace(dto.Resume)
                ? candidate.Resume
                : dto.Resume;

            candidate.Skills = string.IsNullOrWhiteSpace(dto.Skills)
                ? candidate.Skills
                : dto.Skills;

            candidate.Summary = string.IsNullOrWhiteSpace(dto.Summary)
                ? candidate.Summary
                : dto.Summary;

            candidate.Education = string.IsNullOrWhiteSpace(dto.Education)
                ? candidate.Education
                : dto.Education;

            candidate.Location = string.IsNullOrWhiteSpace(dto.Location)
                ? candidate.Location
                : dto.Location;

            candidate.ActiveStatus = dto.ActiveStatus ?? candidate.ActiveStatus;
            candidate.DateOdBirth = dto.DateOdBirth ?? candidate.DateOdBirth;

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