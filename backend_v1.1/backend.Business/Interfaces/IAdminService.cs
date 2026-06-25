using backend.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Business.Interfaces
{
    public interface IAdminService
    {
        public Task<IReadOnlyList<UserDetails>> GetAllUsers();
    }
}
