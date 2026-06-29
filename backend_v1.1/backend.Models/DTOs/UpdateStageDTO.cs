namespace backend.Models.DTOs
{
    public class UpdateStageDTO
    {
        public Guid ApplicationId { get; set; }
        public string Stage { get; set; } = string.Empty;
    }
}
