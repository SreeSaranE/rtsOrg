namespace backend.Models.DataBase
{
    public class Job
    {
        public int JobId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Dept { get; set; } = string.Empty;
        public string JobStatus { get; set; } = string.Empty;

        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Foreign Key
        public User Creator { get; set; } = null!;

        // Navigation Property
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
