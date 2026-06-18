using System;
using System.Collections.Generic;
using System.Text;
using backend.Models;

namespace backend.Service.Interfaces
{
    public interface IUserService
    {
        public Task RegisterUser(User user);
    }
}
