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
        private readonly IAdminService _adminService;

        public AuthController(
            IUserService service,
            IAdminService adminService)
        {
            _service = service;
            _adminService = adminService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]  Login dto)
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
        public async Task<IActionResult> Register([FromBody] Register dto)
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

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _adminService.GetAllUsers());
        }

        [HttpPut("user/{id}/status")]
        public async Task<IActionResult> AlterUserStatus(int id)
        {
            var result = await _adminService.AlterUserStatus(id);

            if (!result)
                return NotFound();

            return Ok(result);
        }
    }
}