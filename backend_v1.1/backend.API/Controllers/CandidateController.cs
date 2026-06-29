using backend.Business.Interfaces;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateController : Controller
    {
        private readonly ICandidateService _candidateService;
        public CandidateController(ICandidateService candidateService)
        { _candidateService = candidateService; }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterCandidate(CandidateRegisterDTO dto)
        {
            var result = await _candidateService.RegisterCandidate(dto);
            if (result) return Ok("Candidate added successfully");
            return BadRequest("Candidate not added");
        }

        [HttpGet("candidates")]
        public async Task<IActionResult> GetAllCandidates()
        {
            return Ok(await _candidateService.GetAllCandidatets());
        }

        [HttpPut("delete/{candId}")]
        public async Task<IActionResult> DeleteCandidate(Guid candId)
        {
            var result = await _candidateService.DeleteCandidate(candId);
            if (result) return Ok("Candidate deleted");
            return NotFound("No candidate Found");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateCandidate([FromBody] CandidateDetailsDTO dto)
        {
            var result = await _candidateService.UpdateCandidate(dto);
            if (result) return Ok("Candidate updated successfully");
            return NotFound("No candidate found");
        }
    }
}