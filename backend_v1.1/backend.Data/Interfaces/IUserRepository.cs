using backend.Models.DataBase;
using backend.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id);

        Task<User?> GetByEmail(string email);

        Task<bool> CheckEmail(string email);

        Task AddUser(User user);
    }
}
