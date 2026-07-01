namespace backend.Models.DataBase
{
    public class Offer
    {
        public Guid OfferId { get; set; } = Guid.NewGuid();

        public Guid CandidateId { get; set; }

        public decimal Salary { get; set; } = decimal.Zero;
        public string? Status { get; set; }

        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Property
        public Candidate Candidate { get; set; } = null!;
    }
}
