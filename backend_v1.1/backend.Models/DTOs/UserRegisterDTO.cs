namespace backend.Models.DTOs
{
    public class UserRegisterDTO
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public String Role { get; set; } = String.Empty;

        public bool IsActive { get; set; }
    }
}
