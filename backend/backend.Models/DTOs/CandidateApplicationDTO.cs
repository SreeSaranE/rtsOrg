namespace backend.Models.DTOs
{
    public class ApplicationDetailsDTOCandidateApplicationDTO
    {
        public Guid JobApplicationId { get; set; } = Guid.NewGuid();

        public Guid JobId { get; set; }
        public Guid CandidateId { get; set; }
        public int Stage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
