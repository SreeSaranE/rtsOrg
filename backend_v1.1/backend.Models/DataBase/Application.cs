namespace backend.Models.DataBase
{
    public class Application
    {
        public int ApplicationId { get; set; }

        public int JobId { get; set; }
        public int CandidateId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public Job Job { get; set; } = null!;
        public Candidate Candidate { get; set; } = null!;
    }
}
