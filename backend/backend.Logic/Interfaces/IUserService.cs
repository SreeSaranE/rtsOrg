using backend.data.DTOs;
using backend.Models;
using backend.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Service.Interfaces
{
    public interface IUserService
    {
        public Task<bool> RegisterUser(RegisterDto dto);

        public Task<LoginResponseDto> Login(LoginDto dto);
    }
}
