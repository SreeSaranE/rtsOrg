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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO dto)
        {
            var user = await _candidateService.Login(dto);
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
        public async Task<IActionResult> RegisterCandidate(CandidateRegisterDTO dto)
        {
            var result = await _candidateService.RegisterCandidate(dto);
            if (result) return Ok("Candidate added successfully");
            return BadRequest("Candidate not added");
        }

        [HttpGet("{candId}")]
        public async Task<IActionResult> GetCandidateById(Guid candId)
        {
            return Ok(await _candidateService.GetCandidateById(candId));
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
            if (result) return Ok(new
            {
                success = true,
                message = "Candidate deleted"
            });
            return NotFound("No candidate Found");
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateCandidate([FromBody] CandidateDetailsDTO dto)
        {
            var result = await _candidateService.UpdateCandidate(dto);
            if (result) return Ok(new
            {
                success = true,
                message = "Candidate updated successfully"
            });
            return NotFound("No candidate found");
        }
    }
}