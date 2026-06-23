namespace backend.Models.DataBase
{
    public class Offer
    {
        public int OfferId { get; set; }

        public int CandidateId { get; set; }

        public decimal Salary { get; set; }
        public string? Status { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Property
        public Candidate Candidate { get; set; } = null!;
    }
}
