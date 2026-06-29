namespace backend.Models.DataBase
{
    public class ApplicationHistory
    {
        public Guid ApplicationHistoryId { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }

        public string? OldStatus { get; set; }
        public string? NewStatus { get; set; }

        public Guid? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Property
        public JobApplication jobApplication { get; set; } = null!;
    }
}
