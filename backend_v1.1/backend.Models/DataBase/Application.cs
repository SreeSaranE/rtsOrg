namespace backend.Models.DataBase
{
    public class Application
    {
        public Guid ApplicationId { get; set; } = Guid.NewGuid();

        public Guid JobId { get; set; }
        public Guid CandidateId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public Job Job { get; set; } = null!;
        public Candidate Candidate { get; set; } = null!;
    }
}
