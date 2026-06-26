using backend.Models.DataBase;
using backend.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Business.Interfaces
{
    public interface ICandidateService
    {
        public Task<bool> RegisterCandidate(CandidateRegister dto);

        public Task<IReadOnlyList<CandidateDetails>> GetAllCandidatets();

        public Task<bool> UpdateCandidate(CandidateDetails dto);

        public Task<bool> DeleteCandidate(Guid candId);
    }
}
