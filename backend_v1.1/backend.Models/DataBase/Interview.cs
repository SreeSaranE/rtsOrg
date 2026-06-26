namespace backend.Models.DataBase
{
    public class Interview
    {
        public Guid InterviewId { get; set; } = Guid.NewGuid();

        public Guid CandidateId { get; set; }
        public Guid InterviewerId { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string? Result { get; set; }

        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public Candidate Candidate { get; set; } = null!;
        public User Interviewer { get; set; } = null!;
    }
}
