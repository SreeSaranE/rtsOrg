namespace backend.Models.DTOs
{
    public class AddJob
    {
        public string Name { get; set; } = string.Empty;
        public string Dept { get; set; } = string.Empty;
        public Guid CreatedBy { get; set; }
    }
}
