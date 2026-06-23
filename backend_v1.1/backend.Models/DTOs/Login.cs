using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Models.DTOs
{
    public class Login
    {
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
