namespace backend.Models.DTOs
{
    public class InterviewDetailsDTO
    {
        public Guid InterviewId { get; set; }
        public Guid JobApplicationId { get; set; }
        public string JobName { get; set; }
        public Guid InterviewerId { get; set; }
        public string InterviewerName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Result { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}