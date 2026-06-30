using backend.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _adminService.GetAllUsers());
        }

        [HttpPut("edit/{userId}/status")]
        public async Task<IActionResult> AlterUserStatus(Guid userId)
        {
            var result = await _adminService.AlterUserStatus(userId);

            if (!result)
                return NotFound("No user found");

            return Ok(new
            {
                success = true,
                message = "Role changed"
            });
        }

        [HttpPut("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var result = await _adminService.DeleteUser(userId);
            if (result) return Ok(new
            {
                success = true,
                message = "User deleted"
            });
            return NotFound("No user found");
        }
    }
}