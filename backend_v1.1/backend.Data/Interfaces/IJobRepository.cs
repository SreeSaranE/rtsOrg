using backend.Models.DataBase;
using backend.Models.DTOs;

namespace backend.Data.Interfaces
{
    public interface IJobRepository
    {
        public Task AddJob(Job job);
        public Task<Boolean> CheckJob(string name, string dept);
    }
}