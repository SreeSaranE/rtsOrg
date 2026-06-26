namespace backend.Models.DTOs
{
    public class CandidateDetails
    {
        public Guid CandidateId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Resume { get; set; }
        public bool? Status { get; set; }
        public int? Stage { get; set; }
        public DateOnly? DateOdBirth { get; set; }
        public string? Skills { get; set; }
        public string? Summary { get; set; }
        public string? Education { get; set; }
        public string? Location { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}