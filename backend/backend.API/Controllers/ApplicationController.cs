using backend.Business.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {
        private readonly IApplicationService _applicationService;
        public ApplicationController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddApplicaiton([FromBody] JobApplication application)
        {
            var result = await _applicationService.AddApplication(application.JobId, application.CandidateId);
            if (result) return Ok(new
            {
                success = true,
                message = "Application Successfully submitted"
            });
            return BadRequest(new
            {
                success = false,
                message = "Application already submitted"
            });
        }

        [HttpPost("updatestage")]
        public async Task<IActionResult> UpdateStage([FromBody] UpdateStageDTO stage)
        {
            var result = await _applicationService.UpdateApplicationStage(stage);
            if (result == 1) return Ok(new
            {
                success = true,
                message = "Done"
            });
            else if (result == 2) return NotFound("Application Not Found");
            return BadRequest("Application is already in that stage");
        }

        [HttpGet("applications")]
        public async Task<IActionResult> GetAllApplications()
        {
            return Ok(await _applicationService.GetAllApplication());
        }

        [HttpGet("candidate/{candId}")]
        public async Task<IActionResult> GetCadidateApplications(Guid candId)
        {
            var result = await _applicationService.GetCandidateApplications(candId);
            return Ok(result);
        }

        [HttpPut("delete/{applicationId}")]
        public async Task<IActionResult> DeleteApplication(Guid applicationId)
        {
            var result = await _applicationService.DeleteApplication(applicationId);
            if(result) return Ok(new
            {
                success = true,
                message = "Application deleted successfully"
            });
            return NotFound("No application with that id found");
        }
    }
}
