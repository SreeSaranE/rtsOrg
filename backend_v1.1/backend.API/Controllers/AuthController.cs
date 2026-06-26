using backend.Business.Interfaces;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService _service;
        public AuthController(IUserService service)
            { _service = service; }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]  UserLogin dto)
        {
            var user = await _service.Login(dto);
            if (user.State == "incorrectEmail")
            {
                return Unauthorized("No Email");
            }

            if (user.State == "incorrectPassword")
            {
                return Unauthorized("Incorrect Password");
            }

            return Ok(new
                {
                    user.Token
                }
            );
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister dto)
        {
            var result = await _service.RegisterUser(dto);
            if (!result)
            {
                return BadRequest("Login Failed");
            }return Ok("User registered Successfully");
        }


        [HttpGet("email")]
        public async Task<IActionResult> CheckEmail([FromQuery] string email)
        {
            return Ok(await _service.CheckEmail(email));
        }

    }
}