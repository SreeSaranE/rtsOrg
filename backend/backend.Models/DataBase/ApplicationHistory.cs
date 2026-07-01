namespace backend.Models.DataBase
{
    public class ApplicationHistory
    {
        public Guid ApplicationHistoryId { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }

        public int? OldStage { get; set; }
        public int NewStage { get; set; } = 1;
        public Guid CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation Property
        public JobApplication? JobApplication { get; set; } = null!;
    }
}