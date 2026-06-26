namespace backend.Models.DataBase
{
    public class History
    {
        public Guid HistoryId { get; set; } = Guid.NewGuid();

        public Guid CandidateId { get; set; }

        public string? OldStatus { get; set; }
        public string? NewStatus { get; set; }

        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Property
        public Candidate Candidate { get; set; } = null!;
    }
}
