namespace backend.Models.DataBase
{
    public class User
    {
        public int UserId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? Created { get; set; } = DateTime.UtcNow;

        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public ICollection<Job> JobsCreated { get; set; } = new List<Job>();
        public ICollection<Interview> InterviewsConducted { get; set; } = new List<Interview>();
    }
}
