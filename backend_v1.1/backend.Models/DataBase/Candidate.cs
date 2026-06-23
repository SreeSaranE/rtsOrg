namespace backend.Models.DataBase
{
    public class Candidate
    {
        public int CandidateId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Resume { get; set; }
        public string? Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public ICollection<Application> Applications { get; set; } = new List<Application>();
        public ICollection<Interview> Interviews { get; set; } = new List<Interview>();
        public ICollection<History> Histories { get; set; } = new List<History>();
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    }
}
