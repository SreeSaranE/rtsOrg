using backend.Business.Interfaces;
using backend.Models.DataBase;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewController : Controller
    {
        private readonly IInterviewService _interviewService;
        public InterviewController(IInterviewService interviewService)
        { _interviewService = interviewService; }

        [HttpPost("add")]
        public async Task<IActionResult> ScheduleInterview([FromBody] Interview interview)
        {
            var result = await _interviewService.ScheduleInterview(interview);
            if (result) return Ok("Interiew Scheduled");
            return BadRequest("Something went wrong");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateInterview(InterviewResponseDTO dto)
        {
            var result = await _interviewService.UpdateInterview(dto);
            if (result == 1) return Ok("Interview Updated");
            else if (result == 2) return BadRequest("Schedule time collapses");
            else if (result == 3) return NotFound("No interview with that is found");
            return BadRequest();
        }

        [HttpPut("delete/{interviewId}")]
        public async Task<IActionResult> DeleteInterview(Guid interviewId)
        {
            var result = await _interviewService.DeleteInterview(interviewId);
            if (result) return Ok("Intervew deleted successfully");
            return NotFound("Interview not found");
        }
    }
}
