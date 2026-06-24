namespace backend.Models.DTOs
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
    }
}