namespace backend.Models.DataBase
{
    public class Interview
    {
        public int InterviewId { get; set; }

        public int CandidateId { get; set; }
        public int InterviewerId { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string? Result { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public Candidate Candidate { get; set; } = null!;
        public User Interviewer { get; set; } = null!;
    }
}
