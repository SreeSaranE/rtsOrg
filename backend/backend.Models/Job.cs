namespace backend.Models
{
    public class Job
    {
        public int JobId { get; set; }
        public string JobName { get; set; } = string.Empty;
        public int CreatedBy { get; set; }
        public string Department { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string JobStatus { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
