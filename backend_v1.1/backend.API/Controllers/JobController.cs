using backend.Business.Interfaces;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : Controller
    {
        private readonly IRecruiterService _recruiterService;
        public JobController(IRecruiterService recruiterService)
        {
            _recruiterService = recruiterService;
        }

        [HttpPost("addjob")]
        public async Task<IActionResult> AddJob([FromBody] AddJob job)
        {
            var result = await _recruiterService.AddJob(job);
            if(result) return Ok("Job Added");

            return BadRequest("Job Already present");
        }

        [HttpPost("test")]
        public async Task<IActionResult> test()
        {
            return Ok("HEE");
        }
    }
}
