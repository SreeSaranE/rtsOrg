namespace backend.Models.DTOs
{
    public class JobDetailsDTO
    {
        public Guid JobId { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Dept { get; set; } = string.Empty;
        public Boolean JobStatus { get; set; } = true;
        public Guid CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}