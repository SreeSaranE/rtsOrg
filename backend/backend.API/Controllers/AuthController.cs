using backend.data.DTOs;
using backend.data.Interfaces;
using backend.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var result = await _userService.RegisterUser(dto);

            if(!result)
            {
                return BadRequest("Email already exist.");
            }

            return Ok("User registered Successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userService.Login(dto);

            if (user == null)
            {
                return Unauthorized("Invalid Email or Password");
            }
            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                user.Role
            });

        }
    }
}
