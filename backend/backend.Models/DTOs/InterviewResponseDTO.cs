namespace backend.Models.DTOs
{
    public class InterviewResponseDTO
    {
        public Guid InterviewId { get; set; }
        public Guid? JobApplicationId { get; set; }
        public Guid? InterviewerId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? Result { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}