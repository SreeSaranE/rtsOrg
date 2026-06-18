using System;
using System.Collections.Generic;
using System.Text;

using backend.Models;
using backend.Service.Interfaces;
using backend.data.Interfaces;

namespace backend.Service.Services
{
    public class UserService: IUserService
    {

        private readonly IUserRepository _userRepository;

        private UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> RegisterUser(User user)
        {
            var existUser = _userRepository.GetByEmail(user.Email);

            if (existUser != null)
            {
                return false;
            }
            await _userRepository.AddUser(user);
            return true;
        }
    }
}
