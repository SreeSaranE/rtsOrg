namespace backend.Models.DTOs
{
    public class UserDetails
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Role { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
