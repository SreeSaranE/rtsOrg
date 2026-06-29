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

        [HttpPost("new")]
        public async Task<IActionResult> AddApplicaiton([FromBody] JobApplication application)
        {
            var result = await _applicationService.AddApplication(application.JobId, application.CandidateId);
            if (result) return Ok("Application Successfully submitted");
            return BadRequest("Application already submitted");
        }

        [HttpPost("updatestage")]
        public async Task<IActionResult> UpdateStage([FromBody] UpdateStageDTO stage)
        {
            var result = await _applicationService.UpdateApplication(stage);
            return Ok("Done");
        }

        [HttpPut("delete/{applicationId}")]
        public async Task<IActionResult> DeleteApplication(Guid applicationId)
        {
            var result = await _applicationService.DeleteApplication(applicationId);
            if(result) return Ok("Application deleted successfully");
            return NotFound("No application with that id found");
        }
    }
}
