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
        public async Task<IActionResult> AddJob([FromBody] JobRegisterDTO job)
        {
            var result = await _recruiterService.AddJob(job);
            if(result) return Ok("Job Added");

            return BadRequest("Job Already present");
        }

        [HttpPut("edit/{jobId}/status")]
        public async Task<IActionResult> AlterJobStatus(Guid jobId)
        {
            var result = await _recruiterService.AlterJobStatus(jobId);
            if (result) return Ok("Job status Updated");
            return NotFound("No job found");
        }

        [HttpGet("jobs")]
        public async Task<IActionResult> GetAllJobs()
        {
            return Ok(await _recruiterService.GetAllJobs());
        }

        [HttpPut("delete/{jobId}")]
        public async Task<IActionResult> DeleteJob(Guid jobId) 
        {
            var result = await _recruiterService.DeleteJob(jobId);
            if (result) return Ok("Job deleted");
            return NotFound("No job found");
        }
    }
}