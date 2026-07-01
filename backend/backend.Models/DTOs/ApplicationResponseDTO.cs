namespace backend.Models.DTOs
{
    public class ApplicationResponseDTO
    {
        public Guid JobApplicationId { get; set; } = Guid.NewGuid();
        public Guid JobId { get; set; }
        public Guid CandidateId { get; set; }
        public string? CandidateName { get; set; }
        public string? JobName { get; set; }
        public string Stage { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
