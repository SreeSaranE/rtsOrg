namespace backend.Models.DataBase
{
    public class Candidate
    {
        public Guid CandidateId { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? Resume { get; set; }
        public bool? ActiveStatus { get; set; } = true;
        public DateOnly? DateOdBirth { get; set; }
        public string? Skills { get; set; } = string.Empty;
        public string? Summary { get; set; } = string.Empty;
        public string? Education { get; set; } = string.Empty;
        public string? Location { get; set; } = string.Empty;

        public Guid? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public ICollection<JobApplication> jobApplications { get; set; } = new List<JobApplication>();
        public ICollection<Interview> Interviews { get; set; } = new List<Interview>();
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    }
}