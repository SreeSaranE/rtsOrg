namespace backend.Data.Repositories
{
    public class CandidateApplicationDTO
    {
        public Guid JobApplicationId { get; set; } = Guid.NewGuid();

        public Guid JobId { get; set; }
        public Guid CandidateId { get; set; }
        public int? Stage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
