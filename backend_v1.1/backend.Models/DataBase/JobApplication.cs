namespace backend.Models.DataBase
{
    public class JobApplication
    {
        public Guid JobApplicationId { get; set; } = Guid.NewGuid();

        public Guid JobId { get; set; }
        public Guid CandidateId { get; set; }
        public int? Stage { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public Job? Job { get; set; } = null!;
        public Candidate? Candidate { get; set; } = null!;
        public ICollection<ApplicationHistory> ApplicationHistory { get; set; } = new List<ApplicationHistory>();
    }
}
