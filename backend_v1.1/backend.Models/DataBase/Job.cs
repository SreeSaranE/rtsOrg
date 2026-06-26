namespace backend.Models.DataBase
{
    public class Job
    {
        public Guid JobId { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;
        public string Dept { get; set; } = string.Empty;
        public bool JobStatus { get; set; } = true;

        public Guid CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Foreign Key
        public User Creator { get; set; } = null!;

        // Navigation Property
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
