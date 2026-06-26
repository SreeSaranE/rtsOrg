
namespace backend.Models.DataBase
{
    public class User
    {
        public Guid UserId { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int Role { get; set; }
        public bool IsActive { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Properties
        public ICollection<Job> JobsCreated { get; set; } = new List<Job>();
        public ICollection<Interview> InterviewsConducted { get; set; } = new List<Interview>();
    }
}
