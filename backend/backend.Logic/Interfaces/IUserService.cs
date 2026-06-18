using System;
using System.Collections.Generic;
using System.Text;
using backend.Models;
using backend.data.DTOs;

namespace backend.Service.Interfaces
{
    public interface IUserService
    {
        public Task<bool> RegisterUser(RegisterDto dto);

        public Task<User?> Login(LoginDto dto);
    }
}
