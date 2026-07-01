using backend.Models.DataBase;

namespace backend.Business.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);

        public string CandidateGenerateToken(Candidate candidate);
    }
}