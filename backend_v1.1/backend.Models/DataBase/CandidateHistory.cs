namespace backend.Models.DataBase
{
    public class History
    {
        public int HistoryId { get; set; }

        public int CandidateId { get; set; }

        public string? OldStatus { get; set; }
        public string? NewStatus { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Property
        public Candidate Candidate { get; set; } = null!;
    }
}
